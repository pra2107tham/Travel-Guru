import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import jwt from "jsonwebtoken";

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const getAnswer = async (req, res) => {
  const prompt = req.body.input;
  const token = req.cookies.jwt;
  if(!token){
    return res.status(401).json({error: "Unauthorized"})
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if(!decoded){
    return res.status(401).json({error: "Unauthorized"})
  }
  const userId = decoded.userId;

  try {
    let conversation = await Conversation.findOne({ user: userId }).populate(
      "messages"
    );
    if (!conversation) {
      conversation = await Conversation.create({ user: userId });
    }
    console.log(prompt)
    const userMessage = new Message({
      sender: "user",
      message: prompt,
    });

    await userMessage.save();
    conversation.messages.push(userMessage);
    await conversation.save();
    // Build the conversation history with 'parts' property containing 'text'
    //    console.log(conversation.messages)
    const messages = await Message.find({
      _id: { $in: conversation.messages },
    });
    const history = messages.map((msg) => ({
      role: msg.sender,
      parts: [{ text: msg.message }],
    }));
    if (!history) {
      throw new Error("No history found");
    }
    // console.log(history)

    const instruction = `Objective: Act as a virtual travel agent, providing customized travel itineraries based on user preferences and requirements.

Guidelines:
Format: The conversation should start with a brief outline of the places as per the itineraries generated for the user, followed by detailed recommendations and suggestions.

User Interaction:

Start each conversation expecting user input about their travel plans, interests, and preferences.
Listen attentively to user queries and requests regarding destinations, activities, budget constraints, and any special considerations.
Itinerary Planning:

Generate detailed travel itineraries that include transportation options (flights, trains, car rentals), accommodation choices (hotels, resorts, vacation rentals), and suggested activities.
Consider factors such as travel duration, preferred travel dates, and any specific landmarks or attractions the user wishes to visit.
Personalization:

Tailor recommendations based on user-provided information, including preferred travel style (e.g., luxury, budget-friendly, family-friendly) and specific interests (e.g., cultural experiences, adventure sports, historical sites).
Offer alternatives and choices to accommodate diverse preferences and optimize user satisfaction.
Local Insights:

Provide insights on local culture, cuisine, climate, and practical tips for a smooth travel experience.
Highlight seasonal attractions, local events, and any current travel advisories or restrictions that may affect the itinerary.
Customer Service:

Maintain a friendly and professional tone throughout interactions.
Respond promptly to user inquiries, clarify uncertainties, and offer additional information as needed to enhance user confidence and satisfaction.
Continual Improvement:

Learn from user feedback and adapt responses to improve accuracy and relevance of travel recommendations.
Stay updated with current travel trends, new destinations, and changes in travel regulations to provide up-to-date advice.
Additional Notes:

Aim to simulate a personalized travel planning experience that reflects the expertise and attention to detail expected from a professional travel consultant.
Strive for clear communication and logical flow in generating travel itineraries that meet or exceed user expectations.`;
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      system_instruction: instruction,
    });

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const text = response.text();

    console.log(text);

    const botMessage = new Message({
      sender: "model",
      message: text,
    });

    conversation.messages.push(botMessage);
    await botMessage.save();
    await conversation.save();

    res
      .status(200)
      .json({ aiResponse: text, conversation: conversation.messages, message: "Success"});
  } catch (error) {
    console.log("Error getting answer : ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({error: "Unauthorized"})
    }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if(!decoded){
    return res.status(401).json({error: "Unauthorized"})
  }
  const userId = decoded.userId;
  try {
    let conversation = await Conversation.findOne({ user: userId }).populate(
      "messages"
    );
    if (!conversation) {
      return res.status(200).json({ message: "Start a new conversation" });
    }
    const messages = await Message.find({
      _id: { $in: conversation.messages },
    });
    if (!messages) {
      throw new Error("No messages found");
    }
    res.status(200).json({ messages });
  } catch (error) {
    console.log("Error in getMessages", error);
    res.status(500).json({ message: "Server Error" });
  }
};
export { getAnswer, getMessages };
