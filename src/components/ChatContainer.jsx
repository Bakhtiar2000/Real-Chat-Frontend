import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setMessages, useMessages, useSelectedUser } from "../redux/features/message/messageSlice";
import { subscribeToMessages, unsubscribeFromMessages } from "../socket/socket.api";
import { useGetMessagesQuery } from "../redux/features/message/messageApi";
import { useCurrentUser, useSocket } from "../redux/features/auth/authSlice";
import { formatMessageTime } from "../utils/utils";


const ChatContainer = () => {
  const selectedUser = useAppSelector(useSelectedUser);
  const authUser = useAppSelector(useCurrentUser);
  const messageEndRef = useRef(null);
  const dispatch = useAppDispatch()
  const socket = useAppSelector(useSocket);
  const { data: messages, isLoading: messagesLoading, isFetching: messagesFetching } = useGetMessagesQuery({ userId: selectedUser.selectedUser._id })

  // dispatch(setMessages({ messages: messagesData }))
  // const messages = useAppSelector(useMessages);  // Could be avoided maybe if used messagesData directly

  useEffect(() => {
    if (messages) {
      dispatch(setMessages({ messages: messages }));
    }
  }, [dispatch, messages]);

  console.log(messages, selectedUser, authUser)
  // useEffect(() => {
  if (selectedUser) {
    subscribeToMessages(selectedUser, socket);
  }
  // return () => unsubscribeFromMessages(socket);
  // }, [selectedUser._id]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (messagesLoading | messagesFetching) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.data?.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            {/* <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div> */}
            <div className="chat-bubble flex flex-col">
              {message?.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message?.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
