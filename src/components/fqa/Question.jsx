"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ProductCards } from "@/mocks/Products";
import { IoMdArrowDropdown } from "react-icons/io";

export default function Questions({ helpTitleNormalText, helpTitleBoldText }) {
  const pathname = usePathname();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    const segments = pathname.split("/");
    const productId = parseInt(segments.find((seg) => /^\d+$/.test(seg)));

    const product = ProductCards.find((p) => p.id === productId);
    if (!product) return;

    const { title, date, price, rating, colors, sizes } = product;

    const generatedQuestions = [
      {
        id: 1,
        title: `When was "${title}" added to the store?`,
        description: `This product was listed on ${date}. Is it part of a seasonal drop or a permanent collection?`,
      },
      {
        id: 2,
        title: `Is "${title}" still available in all sizes?`,
        description: `Currently offered sizes include: ${sizes.join(
          ", "
        )}. Are all of them still in stock or are some limited?`,
      },
      {
        id: 3,
        title: `What color variants does "${title}" come in?`,
        description: `Available shades include: ${colors.join(
          ", "
        )}. Are these standard or limited-edition colors?`,
      },
      {
        id: 4,
        title: `Is "${title}" eligible for discounts or bundles?`,
        description: `Its listed price is ${price}. Are there any promotions or bundle offers available for this item?`,
      },
      {
        id: 5,
        title: `What do customers say about "${title}"?`,
        description: `This product has a rating of ${rating}. Are there detailed reviews or testimonials available?`,
      },
      {
        id: 6,
        title: `Is "${title}" suitable for gifting?`,
        description: `Would this item be appropriate for birthdays, holidays, or special occasions? Is gift wrapping available?`,
      },
      {
        id: 7,
        title: `Can "${title}" be returned or exchanged?`,
        description: `What is the return policy for this item? Are exchanges allowed for size or color mismatches?`,
      },
      {
        id: 8,
        title: `Is "${title}" part of a matching set or collection?`,
        description: `Does this item belong to a themed collection or have matching accessories or bottoms available?`,
      },
    ];

    setQuestions(generatedQuestions);
    setSelectedQuestion(generatedQuestions[0]);
  }, [pathname]);

  if (!questions.length) return null;

  return (
    <div className="font-satoshi flex flex-col gap-y-10 justify-center items-center">
      <p className="lg:self-start self-center lg:ml-14 text-center font-inter text-3xl font-primary-gray mb-5">
        {helpTitleNormalText}{" "}
        <span className="font-bold">{helpTitleBoldText}</span>
      </p>

      {questions.map((question) => (
        <div
          key={question.id}
          onClick={() => setSelectedQuestion(question)}
          className="cursor-pointer mb-8 group"
        >
          <h3
            className={`
              flex items-center justify-center gap-x-3 
              text-3xl font-semibold group-hover:text-black transition-colors duration-300
              ${selectedQuestion?.id === question.id ? "text-black" : ""}
            `}
          >
            {question.title}
            <div
              className={`${
                selectedQuestion?.id === question.id ? "rotate-45" : "rotate-0"
              } duration-300 transition-all`}
            >
              +
            </div>
          </h3>

          {selectedQuestion?.id === question.id && (
            <>
              <div className="border-b-2 border-black my-4"></div>
              <p className="text-gray-800 transition-all duration-500 ease-in-out md:mx-4 mx-14 lg:text-start text-center opacity-100 text-lg">
                {question.description}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
