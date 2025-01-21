import dbConnect from "@/lib/dbConnect";
import UserModel, { Message } from "@/model/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    //is iser accepting the field
    if (!user.isAcceptingMessages) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting messages",
        },
        {
          status: 401,
        }
      );
    }

    const newMessage = { content, createdAt: new Date() } as Message;

    user.messages.push(newMessage);
    await user.save();
    return Response.json(
      {
        success: true,
        message: "message sent successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Failed to send message: ", error);
    return Response.json(
      {
        success: false,
        message: "Internal server error to send message",
      },
      {
        status: 500,
      }
    );
  }
}
