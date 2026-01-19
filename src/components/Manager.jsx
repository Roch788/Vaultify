import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    try {
      let req = await fetch("http://localhost:3000");
      let passwords = await req.json();
      setPasswordArray(passwords);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("eyecross.svg")) {
      ref.current.src = "eye.svg";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "eyecross.svg";
      passwordRef.current.type = "text";
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = async () => {
    if (!form.site || !form.username || !form.password) {
      toast.error("Please fill all fields!");
      return;
    }

    const newId = form.id || uuidv4();
    const newEntry = { ...form, id: newId };

    // Update state
    if (form.id) {
      setPasswordArray(
        passwordArray.map((item) => (item.id === form.id ? newEntry : item)),
      );
    } else {
      setPasswordArray([...passwordArray, newEntry]);
    }

    // Backend Save logic (Adjust based on your API)
    await fetch("http://localhost:3000", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newEntry),
    });

    setForm({ site: "", username: "", password: "" });
    toast.success("Saved successfully!");
  };

  const deletePassword = async (id) => {
    if (confirm("Delete this password?")) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      await fetch("http://localhost:3000", {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ id }),
      });
      toast.info("Deleted");
    }
  };

  const editPassword = (item) => {
    setForm(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyText = (text) => {
    toast.success("Copied!");
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        transition={Bounce}
      />
      <div className="fixed top-0 z-[-2] h-full w-full bg-green-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <div className="container mx-auto max-w-4xl my-6 px-4">
        <h1 className="font-extrabold text-3xl md:text-4xl text-center">
          <span className="text-green-600">&lt;</span>
          <span className="text-white-800">Vault</span>
          <span className="text-green-600">ify</span>
          <span className="text-green-600">/&gt;</span>{" "}
        </h1>
        <p className="text-center font-bold text-gray-600 mb-6">
          Secure Your Digital Life
        </p>

        {/* Input Form */}
        <div className="flex flex-col p-4 gap-4 bg-white/50 rounded-2xl shadow-sm border border-green-100">
          <input
            type="text"
            name="site"
            placeholder="Website URL"
            value={form.site}
            onChange={handleChange}
            className="rounded-full border border-green-500 bg-white px-4 py-2 outline-none w-full"
          />
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="rounded-full border border-green-500 bg-white px-4 py-2 outline-none w-full"
            />
            <div className="relative w-full">
              <input
                type="password"
                ref={passwordRef}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="rounded-full border border-green-500 bg-white px-4 py-2 outline-none w-full pr-12"
              />
              <span
                className="absolute right-4 top-2 cursor-pointer"
                onClick={showPassword}
              >
                <img ref={ref} className="w-6" src="eye.svg" alt="eye" />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded-full transition-all mx-auto w-full md:w-fit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#ffffff"
              style={{ width: "20px", height: "20px" }}
            ></lord-icon>
            Save Password
          </button>
        </div>

        {/* Display List */}
        <div className="mt-10">
          <h2 className="font-bold text-2xl mb-4 text-green-900">
            Stored Passwords
          </h2>

          {passwordArray.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No passwords found.
            </div>
          ) : (
            <>
              {/* MOBILE VIEW: Cards (Visible only on small screens) */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {passwordArray.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded-xl border-l-4 border-green-500 shadow-sm space-y-3"
                  >
                    <div className="flex justify-between items-start border-b pb-2">
                      <div className="overflow-hidden">
                        <p className="text-xs text-gray-400 uppercase font-bold">
                          Website
                        </p>
                        <a
                          href={item.site}
                          target="_blank"
                          className="text-green-700 font-semibold truncate block underline"
                        >
                          {item.site}
                        </a>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => editPassword(item)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ width: "20px", height: "20px" }}
                          ></lord-icon>
                        </button>
                        <button
                          onClick={() => deletePassword(item.id)}
                          className="p-1 hover:bg-red-50 rounded"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "20px", height: "20px" }}
                          ></lord-icon>
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-bold">
                          User
                        </p>
                        <p className="text-gray-800">{item.username}</p>
                      </div>
                      <button
                        onClick={() => copyText(item.username)}
                        className="text-green-600 text-sm font-medium"
                      >
                        Copy
                      </button>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-bold">
                          Password
                        </p>
                        <p className="text-gray-800">{"•".repeat(8)}</p>
                      </div>
                      <button
                        onClick={() => copyText(item.password)}
                        className="text-green-600 text-sm font-medium"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* DESKTOP VIEW: Table (Visible only on medium screens and up) */}
              <div className="hidden md:block overflow-hidden rounded-xl border border-green-500">
                <table className="w-full text-left">
                  <thead className="bg-green-800 text-white">
                    <tr>
                      <th className="px-4 py-3">Site</th>
                      <th className="px-4 py-3">Username</th>
                      <th className="px-4 py-3">Password</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-green-50">
                    {passwordArray.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-green-200 hover:bg-green-100 transition-colors"
                      >
                        <td className="px-4 py-3 max-w:[200px] truncate">
                          <a
                            href={item.site}
                            target="_blank"
                            className="underline"
                          >
                            {item.site}
                          </a>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {item.username}
                            <span
                              className="cursor-pointer"
                              onClick={() => copyText(item.username)}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                style={{ width: "18px", height: "18px" }}
                              ></lord-icon>
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {"•".repeat(8)}
                            <span
                              className="cursor-pointer"
                              onClick={() => copyText(item.password)}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                style={{ width: "18px", height: "18px" }}
                              ></lord-icon>
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-3">
                            <span
                              className="cursor-pointer"
                              onClick={() => editPassword(item)}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                trigger="hover"
                                style={{ width: "22px", height: "22px" }}
                              ></lord-icon>
                            </span>
                            <span
                              className="cursor-pointer"
                              onClick={() => deletePassword(item.id)}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/skkahier.json"
                                trigger="hover"
                                style={{ width: "22px", height: "22px" }}
                              ></lord-icon>
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
