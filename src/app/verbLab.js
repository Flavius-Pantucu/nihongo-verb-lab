"use client";

import Image from "next/image";
import { useState } from "react";

export default function VerbLab(props) {
  const convertVerbStringToObject = (json) => {
    const verbs = [];
    json.forEach((verb, index) => {
      var verbArray = verb.split("\t");
      verbArray.push(index < 340 ? "godan" : "ichidan");
      verbs.push(verbArray);
    });

    return verbs;
  };

  const randomVerb = () => {
    setCurrentVerb(verbs[Math.floor(Math.random() * verbs.length)]);
  };

  const hiraganaAlphabet = [
    ["あ", "か", "が", "さ", "た", "な", "ば", "ま", "ら"],
    ["い", "き", "ぎ", "し", "ち", "に", "び", "み", "り"],
    ["う", "く", "ぐ", "す", "つ", "ぬ", "ぶ", "む", "る"],
    ["え", "け", "げ", "せ", "て", "ね", "べ", "め", "れ"],
    ["お", "こ", "ご", "そ", "と", "の", "ぼ", "も", "ろ"],
    ["や", "ゆ", "よ", "わ", "を", "ん", "", "", ""],
  ];

  const verbHelpers = [
    ["ます", "ました", "ません", "ませんでした"],
    ["る", "た", "ない", "なかった"],
    ["(ら)れる", "(ら)れた", "(ら)れない", "(ら)れなかった"],
    ["られる", "られた", "られない", "られなかった"],
    ["される", "された", "されない", "されなかった"],
    ["たい", "たかった", "たくない", "たくなかった"],
    ["ましょう", "う", "よう", "こと"],
    ["て", "ないで", "ないほうがいい", "なくてもいい"],
  ];
  const verbForms = ["あ", "い", "う", "え", "お", ""];
  const verbs = convertVerbStringToObject(props.verbs);
  const [currentVerb, setCurrentVerb] = useState("");

  return (
    <>
      <div className='w-full h-screen absolute z-10'>
        <Image
          src={"/wallpaper.jpg"}
          sizes='100vw'
          className='w-full h-full opacity-80 blur-md fill-current'
          height={0}
          width={0}
          alt='Tokyo'></Image>
      </div>
      <div className='flex flex-col h-screen relative z-20'>
        <div className='w-full h-auto pt-8 flex justify-center'>
          <div className='w-auto h-20 font-bold text-5xl p-5 flex items-center text-[#a82c41] cursor-default select-none bg-slate-100/40 rounded-2xl'>
            私の動詞ラブへようこそ
          </div>
        </div>
        <div className='w-full h-auto py-20 flex justify-center flex-grow'>
          <div className='w-[80%] min-w-[1080px] min-h-[720px] bg-slate-300/40 rounded-2xl flex flex-col'>
            <div className='w-full h-[15%] py-3 px-8 rounded-2xl flex justify-between'>
              {[...Array(12)].map((x, i) => (
                <div
                  key={i}
                  className='h-full aspect-square bg-[#F07167]/90 rounded-2xl flex justify-center items-center border-dashed border-2 border-slate-100/70 cursor-not-allowed text-7xl'>
                  {currentVerb ? currentVerb[1][i] : ""}
                </div>
              ))}
            </div>
            <div className='w-full h-[10%] px-8 rounded-2xl flex justify-between'>
              <div className='w-[25%] h-full flex justify-start flex-col'>
                <div className='w-full h-[75%] text-5xl flex items-center'>
                  {currentVerb
                    ? currentVerb[0] + " (" + currentVerb[1] + ")"
                    : ""}
                </div>
                <div className='w-full h-[30%] text-2xl'>
                  {currentVerb ? currentVerb[3] : ""}
                </div>
              </div>
              <div className='w-[25%] h-full flex justify-center'>
                <div className='w-full h-[70%] flex justify-center items-center text-2xl'>
                  TBD
                </div>
              </div>
              <div className='w-[25%] h-[70%] flex flex-row justify-between'>
                <div className='w-[75%] h-full py-2 flex flex-col'>
                  <div className='w-full h-full px-4 text-lg flex justify-end'>
                    {currentVerb
                      ? currentVerb[4] == "ichidan"
                        ? "Ichidan verb"
                        : "Godan verb"
                      : ""}
                  </div>
                  <div className='w-full h-full px-4 text-lg flex justify-end'>
                    {currentVerb
                      ? currentVerb[2] == "i"
                        ? " Intransitive (no direct object)"
                        : " Transitive (direct object with を)"
                      : ""}
                  </div>
                </div>
                <div className='w-[25%] h-full py-2'>
                  {currentVerb ? (
                    <button
                      className={`rounded-lg w-full h-full text-xl
                    ${
                      currentVerb[4] == "ichidan"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}>
                      {currentVerb[4]}
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className='w-full h-[60%] py-1 px-8 rounded-2xl flex gap-2'>
              <div className='w-[60%] h-full py-2 flex justify-between'>
                <div className='w-[15%] h-full flex flex-col justify-between gap-y-3'>
                  {verbForms.map((form, index) => (
                    <div
                      key={index}
                      className={`}w-full h-[16%] bg-[#BBD5ED]/90 rounded-3xl flex flex-col ${
                        form == "" ? "opacity-0" : "opacity-100"
                      }`}>
                      <div className='w-full h-[65%] text-5xl flex justify-center items-end select-none'>
                        {form}
                      </div>
                      <div className='w-full h-[35%] text-xl flex justify-center items-start select-none'>
                        form
                      </div>
                    </div>
                  ))}
                </div>
                <div className='w-[85%] h-full flex flex-col justify-between gap-y-3'>
                  {hiraganaAlphabet.map((row, idx) => (
                    <div
                      key={idx}
                      className='flex flex-row h-[16%] w-full px-5 justify-between'>
                      {row.map((letter, letterIdx) => (
                        <div
                          key={idx.toString() + letterIdx.toString()}
                          className={`h-full aspect-square flex justify-center items-center text-3xl font-semibold bg-[#9EB7E5]/90 rounded-2xl cursor-pointer
                          ${letter == "" ? "opacity-0" : "opacity-100"}
                          ${
                            currentVerb &&
                            letter == currentVerb[1][currentVerb[1].length - 1]
                              ? "bg-[#F07167]/90"
                              : ""
                          }`}>
                          {letter}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className='w-[40%] h-full py-2 px-2 flex flex-col gap-y-3'>
                <div className='w-full h-[10%] flex flex-row gap-x-3'>
                  <div className='w-[40%] h-full'>
                    <input
                      type='text'
                      placeholder='enter verb...'
                      className='w-full h-full px-4 text-xl rounded-lg border-none text-black/70 placeholder-black/50 focus:outline-none focus:ring-0'
                    />
                  </div>
                  <div className='w-[20%] h-full'>
                    <button className='w-full h-full text-xl rounded-lg bg-[#BBD5ED] hover:bg-[#9EB7E5] font-semibold ease-in-out transition-colors duration-300'>
                      Search
                    </button>
                  </div>
                  <div className='w-[20%] h-full '>
                    <button className='w-full h-full text-xl rounded-lg bg-[#BBD5ED] hover:bg-[#9EB7E5] font-semibold ease-in-out transition-colors duration-300'>
                      Clear
                    </button>
                  </div>
                  <div className='w-[20%] h-full'>
                    <button
                      className='w-full h-full text-xl rounded-lg bg-[#BBD5ED] hover:bg-[#9EB7E5] font-semibold ease-in-out transition-colors duration-300'
                      onClick={randomVerb}>
                      Random
                    </button>
                  </div>
                </div>
                <div className='w-full h-[90%] flex flex-col gap-y-2 justify-between'>
                  {verbHelpers.map((helpersRow, index) => (
                    <div
                      key={index}
                      className='w-full h-[14%] flex flex-row gap-x-2'>
                      {helpersRow.map((helper, indx) => (
                        <div
                          key={indx}
                          className='w-[25%] h-full bg-[#9EB7E5]/60  text-xl font-semibold flex justify-center items-center cursor-not-allowed rounded-xl'>
                          {helper}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='w-full h-[15%] py-3 px-8 rounded-2xl'>
              <div className='w-full h-full bg-[#9EB7E5]/60 rounded-2xl flex justify-center items-center'>
                1
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
