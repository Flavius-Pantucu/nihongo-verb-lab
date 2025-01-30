"use client";

import { M_PLUS_1 } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function VerbLab(props) {
  const convertVerbStringToObject = (json) => {
    const verbs = [];
    json.forEach((verb, index) => {
      var verbArray = verb.split("\t");
      verbArray.push(index < 430 ? "godan" : "ichidan");
      verbs.push(verbArray);
    });
    return verbs;
  };

  const searchVerb = () => {
    const verbsFilter = verbs.filter(
      (verb) => verb[1] === searchVerbInput || verb[0] === searchVerbInput
    );

    verbsFilter.length > 0 ? setCurrentVerb(verbsFilter[0]) : "";
  };

  const randomVerb = () => {
    setCurrentVerb(verbs[Math.floor(Math.random() * verbs.length)]);
  };

  const removeStem = (idx) => {
    if (
      idx != currentVerbHiragana.length - 1 ||
      currentVerb[4] == "godan" ||
      stemRemovedFlag
    )
      return;
    setCurrentVerbHiragana(currentVerbHiragana.slice(0, -1));
    setStemRemovedFlag(true);
  };

  const changeStem = (kana) => {
    if (currentVerb[4] == "ichidan" || kana == "") return;

    for (let i = 0; i < hiraganaAlphabet.length; i++) {
      for (let j = 0; j < hiraganaAlphabet[i].length; j++) {
        if (hiraganaAlphabet[i][j] === kana) {
          setCurrentVerbRow(i);
        }
      }
    }
    setCurrentVerbHiragana(currentVerbHiragana.slice(0, -1) + kana);
  };

  const hiraganaAlphabet = [
    ["あ", "か", "が", "さ", "た", "な", "ば", "ま", "ら"],
    ["い", "き", "ぎ", "し", "ち", "に", "び", "み", "り"],
    ["う", "く", "ぐ", "す", "つ", "ぬ", "ぶ", "む", "る"],
    ["え", "け", "げ", "せ", "て", "ね", "べ", "め", "れ"],
    ["お", "こ", "ご", "そ", "と", "の", "ぼ", "も", "ろ"],
    ["わ", "", "", "", "", "", "", "", ""],
  ];

  const verbHelpers = [
    ["ます", "do~, will~ (formal)", 1],
    ["ました", "did~ (formal)", 1],
    ["ません", "don't~, won't~ (formal)", 1],
    ["ませんでした", "didn't~ (formal)", 1],
    ["る", "do~, will~ (informal)", 3],
    ["た", "~did (informal)", -2],
    ["ない", "~don't, won't~ (informal)", 0],
    ["なかった", "~didn't (informal)", 0],
    ["(ら)れる", "able to~, can~", null],
    ["(ら)れた", "was able to~, could~", null],
    ["(ら)れない", "won't be able to~, can't~", null],
    ["(ら)れなかった", "wasn't able to~, couldn't~", null],
    ["たい", "want to~", 1],
    ["たかった", "wanted to~", 1],
    ["たくない", "don't want to~", 1],
    ["たくなかった", "didn't want to~", 1],
    ["ましょう", "let's~ (formal)", null],
    ["よう", "let's~ (informal)", null],
    ["う", "let's~ (formal)", 4],
    ["こと", "to~, ~ing (noun)", -1],
    ["て", "do~ (command)", -2],
    ["ないで", "don't~ (command)", 0],
    ["ないほうがいい", "shouldn't do~", 0],
    ["なくてもいい", "don't have to~", 0],
  ];

  const verbStems = ["あ", "い", "う", "え", "お", ""];

  const verbs = convertVerbStringToObject(props.verbs);

  const [currentVerb, setCurrentVerb] = useState("");
  const [currentVerbRow, setCurrentVerbRow] = useState(-1);
  const [currentVerbColumn, setCurrentVerbColumn] = useState(-1);
  const [currentVerbHiragana, setCurrentVerbHiragana] = useState("");

  const [stemRemovedFlag, setStemRemovedFlag] = useState(false);

  const [currentVerbHelper, setCurrentVerbHelper] = useState("");

  const [searchVerbInput, setSearchVerbInput] = useState("");

  useEffect(() => {
    if (currentVerb == null) return;

    setStemRemovedFlag(false);

    if (currentVerb == "") {
      setCurrentVerbHiragana("");
      setCurrentVerbColumn(-1);
      setCurrentVerbRow(-1);
    } else {
      setCurrentVerbHiragana(currentVerb[1]);
      const stem = currentVerb[1][currentVerb[1].length - 1];

      for (let i = 0; i < hiraganaAlphabet.length; i++) {
        for (let j = 0; j < hiraganaAlphabet[i].length; j++) {
          if (hiraganaAlphabet[i][j] === stem) {
            setCurrentVerbRow(i);
            setCurrentVerbColumn(j);
          }
        }
      }
    }
  }, [currentVerb]);

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
          <div className='w-auto h-20 font-bold text-5xl p-5 flex items-center text-[#a82c41] cursor-default select-none'>
            私の動詞ラブへようこそ
          </div>
        </div>
        <div className='w-full h-auto py-20 flex justify-center flex-grow'>
          <div className='w-[80%] min-w-[1080px] min-h-[720px] bg-slate-300/50 rounded-2xl flex flex-col'>
            <div className='w-full h-[15%] py-3 px-8 rounded-2xl flex justify-between'>
              {[...Array(12)].map((_, idx) => (
                <div
                  onClick={() => removeStem(idx)}
                  key={idx}
                  className='h-full aspect-square bg-[#F07167]/90 rounded-2xl flex justify-center items-center border-dashed border-2 border-slate-100/70 cursor-default text-7xl hover:bg-[#FFBE86]/90 transition-colors duration-150 ease-linear'>
                  {currentVerbHiragana && currentVerbHiragana[idx]}
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
              <div className='w-[20%] h-full flex justify-center items-center'>
                <div
                  className={`w-full h-[70%] flex justify-center items-center text-3xl bg-[#9EB7E5] rounded-2xl
                   ${currentVerbHelper ? "opacity-100" : "opacity-0"}`}>
                  {currentVerbHelper && currentVerbHelper[1]}
                </div>
              </div>
              <div className='w-[25%] h-[70%] flex flex-row justify-between'>
                <div className='w-[75%] h-full py-2 flex flex-col'>
                  <div className='w-full h-full px-4 text-lg flex justify-end select-none'>
                    {currentVerb
                      ? currentVerb[4] == "ichidan"
                        ? "Ichidan verb"
                        : "Godan verb"
                      : ""}
                  </div>
                  <div className='w-full h-full px-4 text-lg flex justify-end select-none'>
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
                      className={`rounded-lg w-full h-full text-xl cursor-default
                    ${
                      currentVerb[4] == "ichidan"
                        ? "bg-green-400"
                        : "bg-orange-400"
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
                  {verbStems.map((verbStem, index) => (
                    <div
                      key={index}
                      className={`w-full h-[16%] bg-[#BBD5ED]/90 rounded-3xl flex flex-col
                       ${verbStem == "" ? "opacity-0" : "opacity-100"}`}>
                      <div className='w-full h-[65%] text-5xl flex justify-center items-end select-none'>
                        {verbStem}
                      </div>
                      <div className='w-full h-[35%] text-xl flex justify-center items-start select-none'>
                        stem
                      </div>
                    </div>
                  ))}
                </div>
                <div className='w-[85%] h-full flex flex-col justify-between gap-y-3'>
                  {hiraganaAlphabet.map((row, idx) => (
                    <div
                      key={idx}
                      className='flex flex-row h-[16%] w-full px-5 justify-between'>
                      {row.map((kana, kanaIdx) => (
                        <div
                          key={idx.toString() + kanaIdx.toString()}
                          onClick={() => changeStem(kana)}
                          className={`h-full aspect-square flex justify-center items-center text-3xl font-semibold rounded-2xl transition-colors ease-linear duration-300 select-none
                          ${kana == "" ? "opacity-0" : "opacity-100"}
                          ${
                            kanaIdx == currentVerbColumn &&
                            currentVerb[4] == "godan"
                              ? "bg-[#9EB7E5]/90 hover:bg-[#F07167]/60 cursor-pointer"
                              : "bg-[#9EB7E5]/60 cursor-not-allowed"
                          }
                          ${
                            currentVerb &&
                            stemRemovedFlag == false &&
                            kana ==
                              currentVerbHiragana[
                                currentVerbHiragana.length - 1
                              ]
                              ? "bg-[#F07167]/90"
                              : ""
                          }
                          ${
                            stemRemovedFlag == true && kana == "る"
                              ? "bg-[#F07167]/90"
                              : ""
                          }`}>
                          {kana}
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
                      placeholder='ex. 行く or いく'
                      className='w-full h-full px-4 text-xl rounded-lg border-none text-black/70 placeholder-black/50 focus:outline-none focus:ring-0'
                      value={searchVerbInput}
                      onChange={(e) => setSearchVerbInput(e.target.value)}
                    />
                  </div>
                  <div className='w-[20%] h-full'>
                    <button
                      className='w-full h-full text-xl rounded-lg bg-[#BBD5ED] hover:bg-[#9EB7E5] font-semibold ease-in-out transition-colors duration-300'
                      onClick={searchVerb}>
                      Search
                    </button>
                  </div>
                  <div className='w-[20%] h-full '>
                    <button
                      className='w-full h-full text-xl rounded-lg bg-[#BBD5ED] hover:bg-[#9EB7E5] font-semibold ease-in-out transition-colors duration-300'
                      onClick={() => {
                        setCurrentVerb("");
                        setSearchVerbInput("");
                      }}>
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
                <div className='w-full h-[90%] flex flex-row row-span-4 flex-wrap gap-2 justify-between'>
                  {verbHelpers.map((helper, idx) => (
                    <div
                      key={idx}
                      onMouseOver={() => setCurrentVerbHelper(helper)}
                      onMouseOut={() => setCurrentVerbHelper("")}
                      className={`w-[24%] bg-[#9EB7E5]/60 text-xl font-semibold flex justify-center items-center cursor-not-allowed rounded-xl
                      ${helper[2] == currentVerbRow}
                      ${
                        currentVerb[4] == "ichidan" &&
                        stemRemovedFlag &&
                        helper[2] != -1
                          ? "bg-green-400 cursor-pointer"
                          : ""
                      }
                      ${
                        helper[2] < 0 && !stemRemovedFlag && currentVerbRow == 2
                          ? "bg-orange-400 cursor-pointer"
                          : ""
                      }`}>
                      {helper[0]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='w-full h-[15%] py-3 px-8 rounded-2xl'>
              <div className='w-full h-full rounded-2xl flex justify-center items-center flex-row flex-wrap'>
                {[...Array(20)].map((_, i) => (
                  <div
                    onClick={() => setCurrentVerb(verbs[i * 30])}
                    className={`w-[10%] h-[30%] flex justify-center items-center text-2xl cursor-pointer border-[#9EB7E5]/90 
                      ${i != 9 && i != 19 ? "border-r-2" : ""}
                      ${
                        verbs[i * 30][4] == "ichidan"
                          ? "text-green-400"
                          : "text-orange-400"
                      }`}
                    key={i}>
                    {verbs[i * 30][0]}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
