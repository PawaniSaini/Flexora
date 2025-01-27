'use client';
import React, { useRef } from 'react'
import {
    GoogleGenerativeAI, HarmCategory,
    HarmBlockThreshold
} from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY,
);

const Recommend = () => {

    const inputRef = useRef();

    const getResponseForGivenPrompt = async () => {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent();
            console.log(result);

            const response = result.response;
            const text = response.text();
            setpromptResponses([
                ...promptResponses,
                text
            ]);
            console.log(response);
            console.log(text);
        }
        catch (error) {
            console.log("Something Went Wrong");
        }
    };

    async function uploadToGemini(path, mimeType) {
        const uploadResult = await fileManager.uploadFile(path, {
            mimeType,
            displayName: path,
        });
        const file = uploadResult.file;
        console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
        return file;
    }

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
    });

    const generationConfig = {
        temperature: 0.9,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };

    const run = async () => {


        // TODO Make these files available on the local file system
        // You may need to update the file paths
        // const files = [
        //   await uploadToGemini("cake.jpg", "image/jpeg"),
        // ];

        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [
                        { text: inputRef.current.value },
                    ],
                },
            ],
        });

        const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
        console.log(result.response.text());
        // setMarkdownResponse(result.response.text());
    };

    return (
        <div>
            <textarea className='text-black' ref={inputRef}></textarea>
            <button onClick={run}>Suggest</button>
        </div>
    )
}

export default Recommend;