import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
let socket = io.connect("http://localhost:5000");
const App = () => {
  const [info, setInfo] = useState();
  const [message, setMessage] = useState();
  const [messageArray, setMessageArray] = useState([]);

  const messageArrayFun = async () => {
    let obj = {
      mess: message,
      id: socket.id,
    };
    await socket.emit("send_message", obj);

    setMessageArray((list) => {
      return [...list, obj];
    });
    setMessage("");
    // console.log(socket.id)
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageArray((list) => [...list, data]);
    });
    socket.on("newuserconnected", (data) => {
      setInfo(data);
    });
  }, [socket]);
  return (
    <>
      <div className="chatmain">
        <div className="chatcontaner">
          <div className="chatheader">Chat App</div>
          <div className="chatbody">
            <div className="innermessageconntainer">
              {messageArray &&
                messageArray.map((value) => {
                  return (
                    <>
                      <p
                        className={
                          socket.id == value.id
                            ? "innermessage"
                            : "outermessage"
                        }
                      >
                        {value.mess}
                      </p>
                    </>
                  );
                })}
            </div>
            <div className="infomessageconntainer">
              <p className="infomessage">{info}</p>
            </div>
            <div className="outermessageconntainer">
              {messageArray &&
                messageArray.map((value) => {
                  return (
                    <>
                      <p
                        className={
                          !socket.id == value.id
                            ? "innermessage"
                            : "outermessage"
                        }
                      >
                        {value.mess}
                      </p>
                    </>
                  );
                })}
            </div>
          </div>
          <div className="chatfooter">
            <input
              type="text"
              id="messageId"
              value={message}
              placeholder="Message...."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button onClick={messageArrayFun}>Ok</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
