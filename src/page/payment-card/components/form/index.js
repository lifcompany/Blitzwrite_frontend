import { Button } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { AiOutlinePayCircle } from "react-icons/ai";

const currentYear = new Date().getFullYear();
const monthsArr = Array.from({ length: 12 }, (x, i) => {
  const month = i + 1;
  return month <= 9 ? "0" + month : month;
});
const yearsArr = Array.from({ length: 9 }, (_x, i) => currentYear + i);

export default function CForm({
  cardMonth,
  cardYear,
  onUpdateState,
  cardNumberRef,
  cardHolderRef,
  cardDateRef,
  onCardInputFocus,
  onCardInputBlur,
  cardCvv,
  children,
}) {
  const [cardNumber, setCardNumber] = useState("");

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    onUpdateState(name, value);
  };

  // TODO: We can improve the regex check with a better approach like in the card component.
  const onCardNumberChange = (event) => {
    let { value, name } = event.target;
    let cardNumber = value;
    value = value.replace(/\D/g, "");
    if (/^3[47]\d{0,13}$/.test(value)) {
      cardNumber = value
        .replace(/(\d{4})/, "$1 ")
        .replace(/(\d{4}) (\d{6})/, "$1 $2 ");
    } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
      // diner's club, 14 digits
      cardNumber = value
        .replace(/(\d{4})/, "$1 ")
        .replace(/(\d{4}) (\d{6})/, "$1 $2 ");
    } else if (/^\d{0,16}$/.test(value)) {
      // regular cc number, 16 digits
      cardNumber = value
        .replace(/(\d{4})/, "$1 ")
        .replace(/(\d{4}) (\d{4})/, "$1 $2 ")
        .replace(/(\d{4}) (\d{4}) (\d{4})/, "$1 $2 $3 ");
    }

    setCardNumber(cardNumber.trimRight());
    onUpdateState(name, cardNumber);
  };

  const onCvvFocus = (event) => {
    onUpdateState("isCardFlipped", true);
  };

  const onCvvBlur = (event) => {
    onUpdateState("isCardFlipped", false);
  };

  // NOTE: Currently the cursor on the card number field gets reset if we remove a number, the code bellow was used
  // in class components, need to transform this to work with functional components.
  // getSnapshotBeforeUpdate() {
  //     return this.props.cardNumberRef.current.selectionStart;
  // }

  // const componentDidUpdate = function (prevProps, prevState, cursorIdx) {
  //     const node = cardNumberRef.current;
  //     const { cardNumber: cardNum } = state;
  //     const { cardNumber: prevCardNum } = prevState;
  //     if (
  //         cardNum.length > prevCardNum.length &&
  //         cardNum[cursorIdx - 1] === ' '
  //     ) {
  //         cursorIdx += 1;
  //     } else if (prevCardNum[cursorIdx - 1] === ' ') {
  //         cursorIdx -= 1;
  //     }
  //     node.selectionStart = node.selectionEnd = cursorIdx;
  // };

  return (
    <div className="card-form  justify-center">
      <div className="card-list">{children}</div>
      <div className="card-form__inner mt-10 py-4 gap-4">
        <div className="card-input">
          <span>カード番号</span>
          <input
            type="tel"
            name="cardNumber"
            className="p-1 w-60 border"
            autoComplete="off"
            onChange={onCardNumberChange}
            maxLength="19"
            ref={cardNumberRef}
            onFocus={(e) => onCardInputFocus(e, "cardNumber")}
            onBlur={onCardInputBlur}
            value={cardNumber}
          />
        </div>

        <div className="card-input">
          <span className="">カード名義</span>
          <input
            type="text"
            className="p-1 w-60 border"
            autoComplete="off"
            name="cardHolder"
            onChange={handleFormChange}
            ref={cardHolderRef}
            onFocus={(e) => onCardInputFocus(e, "cardHolder")}
            onBlur={onCardInputBlur}
          />
        </div>
        <div className="card-input">
          <span>有効期限</span>
          <div className=" flex justify-between items-center w-60">
          <select
            className="p-1 w-24 border"
            value={cardMonth}
            name="cardMonth"
            onChange={handleFormChange}
            ref={cardDateRef}
            onFocus={(e) => onCardInputFocus(e, "cardDate")}
            onBlur={onCardInputBlur}
          >
            <option value="" disabled>
              月
            </option>

            {monthsArr.map((val, index) => (
              <option key={index} value={val}>
                {val}
              </option>
            ))}
          </select>
          <select
            name="cardYear"
            className="p-1 w-24 border"
            value={cardYear}
            onChange={handleFormChange}
            onFocus={(e) => onCardInputFocus(e, "cardDate")}
            onBlur={onCardInputBlur}
          >
            <option value="" disabled>
              年
            </option>

            {yearsArr.map((val, index) => (
              <option key={index} value={val}>
                {val}
              </option>
            ))}
          </select>
          </div>
         
        </div>
        <div className="card-input">
          <span className="mr-2">CVV</span>
          <input
            type="tel"
            className="p-1 w-60 border"
            maxLength="4"
            autoComplete="off"
            name="cardCvv"
            onChange={handleFormChange}
            onFocus={onCvvFocus}
            onBlur={onCvvBlur}
            ref={cardCvv}
          />
        </div>
        <div className="card-form__row">
          <Button
            color="error"
            type="primary"
            className="px-10 py-5"
            icon={<AiOutlinePayCircle className="w-6 h-6" />}
          >
            <span className="text-lg">お支払い</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
