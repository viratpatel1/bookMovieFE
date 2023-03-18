import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
// import BMS from "../../public/BMS.png";
import "../CSS/SelectSeat.css";

const local = "http://localhost:4000/";
const url = "https://books-my-shows.onrender.com/";

function loadRazorpay(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const SelectSeat = () => {
  // const [select, setSelect] = useState()
  const [len, setLen] = useState();
  // const [id, setId] = useState()
  const [get, setGet] = useState();
  const [arr, setArr] = useState([]);
  const { str } = useParams();
  const { id } = useParams();
  const [amount, setAmount] = useState(200 * id);
  const history = useHistory();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [emails, setEmails] = useState(userInfo?.Email);
  console.log("str", str);
  console.log("id ", id);

  const handleSubmit = (e) => {
    setArr(arr.concat(e.target.value));
    setLen(arr.length);
    // setId(str.pop())
  };

  // const DoPayment = () =>
  // {
  //     const script = document.createElement('script');
  //     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  //     document.body.appendChild(script);
  //     script.onload = displayRazorpay

  // }

  console.log(arr);

  useEffect(() => {
    const getData = async () => {
      try {
        setEmails(userInfo?.Email);
        console.log("emails ", emails);
        const resp = await axios
          .post(`${url}razorpay`, { amount })
          .then((res) => setGet(res.data))
          .catch((err) => console.log("errs ", err));
      } catch (error) {
        console.log("e ", error);
      }
    };
    getData();
  }, []);

  async function displayRazorpay() {
    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // const { data } = await axios.get(`${url}razorpay`)

    // const data = await fetch(`${url}razorpay`, { method: "POST" })
    //     .then((res) => res.json())
    //     .catch((err) => console.log("err ", err));

    // console.log("s ", str)

    const options = {
      key: process.env.RazorPay_ID,
      amount: amount,
      currency: "INR",
      name: "Book my show",
      description: "Test Transaction",
      order_id: get?.id,
      image:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMQEBMQEhATExIQExYTGRYWGBMWEBYSFhMXFxcSFhgZHiohGRwnHBcWIjIjJiosLy8vGSE4OjUtOSkuLywBCgoKDg0OGxAQGy4mICcuLiwuLi4wLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLv/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABQYHAQQDAv/EAEEQAAIBAgIECwUFBwQDAAAAAAABAgMRBBIGBxMhBSIxNEFRYXOBkaEycXKxsjOCorPRFBdCVGKSwSNDUvBjwuL/xAAbAQEAAgMBAQAAAAAAAAAAAAAAAwQCBQYBB//EADgRAAIBAgMEBwUHBQEAAAAAAAABAgMRBCExBRJBoRNRYXGBkbEzwdHh8CIyNDVCUvEUFSNyggb/2gAMAwEAAhEDEQA/APAACifRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATHA+jOIxVnCnlg/458WHh0vwR7ZvQwqVIU4703ZdpDg0WOr+nGhJbSUqzjeMvZpxly2t0ro39ZntWm4ycZJpxbTT5U07NHsouOpXw2No4ne6N3t9X7j8AAxLYAAAAAAAAAAAAAAAAAAAAABwAHQAAAAAAAAAAAT2hPB6r4yCavGnepJNXTUeRPxaNhRRtWGBtSq12t85KEfhik214yt90vRapK0bnHbYrdJiXHhHL48/Q4Z3p/o9J1Y4mjBy2jUZxim3ntunZdaVn7u00U4zKUd5WKmExUsNUVSPl1ozLgXQGrUtKvLZL/irSq/pH1J/hfQyj+yyhQppVY8eMm+PKSXsyk+h9XJct5xnipxRPV2niak1NytZ3stPLj43MBlG25qzW6z5V2HC+6WaIVKuJVTDwTjWu53aUYT6ZPsfLuvvue/gbQKjTtKvJ1Zf8VdUl/mXy7CDo5XsdE9r4ZU1NvNrRa3M0OGraYaPxrYW1KmozoJyhGKSvH+KmkutK67UjKWeTi4uxNgsbHFQ3oq1nZrq6vMA7Y+mIw86byzhKMrKVmnF2fI7MwLl+B8gAD0AAAAAAAAAAAAAAAAAAAAAHUt5wl9E8Bt8ZSh0KSnL4YcZ+dkvELN2MKlRU4Ob0Sv5GraPYHYYWlS6YwWb43vl6tkmcsdLyVj5/KTlJylq8wAAYgAAAAAAoXCOgu1xUpxqRp0Z8dq15KTbzRiuS3Te/SX0GMoqWpYw+Kq4duVN2urEJwPo3h8LZ06d5L+OfGn4PkXhYi9YHAu3obaK49FNu3LKlvzLw5fPrLefloOKtYU8VVhWVa95Lr9O4wE9OCwFWvLJSpynLqir27W+RL3mi0dA6G2nUnKUoOWaNNcWKT35W1vave1rbi04PCU6MFClCMIroikkQqi3qdBiNu0or/ErvtyS975GIY3CTo1HSqRtKLs16+KPOaTrF4D2lNYqC49JWn20+iX3X6N9RmxHOO67GywWKWJoqfHRrt+eoABiWwAAAAAAAAAAAAAAAX7VfgftcQ11Uo+kpf+pQbGyaIYHYYOlBq0pR2kvinxvRWXgS0leRqNtVtzDbv7nbw1fuP3pLwysHQ2uXNJyUIxvZOTTe99CsmU395Fb+XpeciZ1oc1p9+vomUjRTgaONrOlKcoJQc7pJvdKKtv+IynKW9ZFPZ+Fwv9I61aN83fXRW4Inv3k1v5el5y/UfvIrfy9Lzl+pI/u4pfzFT+2BA6XaKwwVOE41JTcpZLSUUksrd93uMX0iV2TUf7XVmoQjm/9j2/vIrfy9Lzl+p1ayKvTh6dvfMg9E+A442rKnKcoqEM90k37SVt/vLVPVxC3FxE79sYteNhHfkrpmWIjsyhPo6kc/8Ap+jJDgTTehiJKFROjUluWZpwb6lLofvSLUYhw3wPUwdXZ1Et6upL2ZR61+nQaHq+4Ydeg6c23UoNK75XTfst9qs14EkJtvdZr9o7OpU6SxGHd4vx14p8s80eXSjTOeGxDoU6cXky5nPNvbSllil2NbyzcA8KLFYeNdLLmumr3yyTs15lD1nYHLXp1kt1aGV/FF/o15Hu1XY7i1qDfI1Vj42jL5R8zxTe/ZmVfB0Xs+Fems1a7687O/iaAeHhfHRoUKlaW9U4t263yKPi2ke4pGs/HZaEKCe+rPM/gh/9OPkSSdlc1eEodPWjT63y48j46Pab1K+IjRqU4KNR5YuOa8Zb2r35V0dBfEZTq4wO0xe0a3UIuX3pcWPzk/A1ZGNNtxzLm1qVGlX3KStkr/XcfOtFOLUknFp3vyWtvuYVi3DaT2f2eaVuvJmeX0sa7plj9hg6sk7SmtnH4pq3yu/AxxswrPRGy2BTahOfBu3l/KAAIDfgAAAAAAAAAAAAAAHv4CwX7RiaVLolON/hTzS/CmbfEzfVjgM1apXa3U45V8U+X0XqaUWaK+zc5PbdbfrqC/Subz+BTNaPNaffr8uZXtWHPJdzP66ZYdaPNaffr8uZXtWPPJdzP66ZjL2iLeH/ACmfj6o1QpGtPm9HvX+XIu5SNafN6Pev8uRJU+6zU7M/F0+8htV3Oqncy+uBqBl+q3nVTuX9cDTzGl90n21+KfcvQomtSC2dCVt+aav2OKdvRHg1Vv8A16y/8S+pfqSOtP7Gh3kvoI3VXzir3S+qJi/aF+j+Uy8fUsmsHA7XBSklxqElUXuW6X4W34FC0JxuwxtJt2jN7J+6e5fiymvYmiqkJU5ezOLg/dJNP5mF4mjKlVlB7pU5uN+lSjK1/S55VTTUhsZqth6mHl9KWXJ6m9GR6wMftsZKCe6ilSXvTbl6u3gaRheFIywkcU+TY7V9jUbyXndGMzlKrVb5ZVZt++cp3+bMqzySRFsKg+lnUl+nLxevJczStWuCyYWVVrfWm7fBFZV6qXmXA8fBeEVChTpL/bhGPilvfnc9jJYqysafE1umrSqdbflw5Ge60cdvpYdPodWS994w+UyhEtpVjtvjKs07xz5F8MOKvk34kSVJO8mzs8BR6HDwh2Xfe8/l4AAGJbAAAAAAAAAAAAAB6eDcK61anSXLOcY+De9+CuweNqKu9DVNBMDscFTbXGrf6r90lxfwqJYz5UqajFRSsopRS7ErJH1LqVlY+f1qrq1JTfFtlM1o81p9+vy5le1Y88l3M/rplh1o81p9+vy5le1Y88l3M/rpkMvaI6HDflM/H1RqhSNafN6Pev8ALkXcpGtPm9HvX+XIkqfdZqNmfi6feQ2q3nVTuZfXA08zDVbzqp3MvrgaeY0fuk+2vxb7l6FG1p/Y0O8l9BG6q+cVe6X1RJLWn9jQ7yX0Ebqr5xV7pfVEwftS/R/KZfXE0wyXWJgdljHNLdXip+O+Ml6J+JrRS9ZuCz4aNVLfSnZ/BNb/AFUSSqrxNdsit0eKiv3ZeenOxWKPDluCp4a/HdVQXdNOb9YteJ8NBsFtsbTurxpXqv7vs/icSANF1X4G1OriGvbkqcfhjvfq/Qggt6SOgxu7hsNVlHWTfnLL4l8IvSPHfs+Fq1f4owaj8cuLH1aJMous/H2p0qCe+ctpL4Y3S9X6FmbtFs5XBUemrwp9bz7tWZ3c4AUzvG7gAAAAAAAAAAAAAAAturfA58U6rXFoQb+/Pir0zlSNV1dYHZ4TO1xq0nP7q4sfk34klNXka3a1bosLK2ry89eRajoBaOMKZrR5rT79flzK9qx55LuZ/XTL5pJwNHGUdk5ODUlKMkr2kk1vXSrNkforoosFKVSVTPNxyJqOWMY3Te67u3ZeRFKD37m5o42lHZ86Lf2s8u+xaCka0+b0e9f5ci7kNpLwJHGUdm5ZZRlnjK17Ss1vXSrNmc03FpFDBVo0cRCctEykaredVO5f1wNPKzonossC5TdTPUmst0ssVG97JXd329hZjynFqNmS7Trwr4hzg7qyXkija0/saHeS+gjdVfOKvdL6olv0n4BjjaSg5OEoyzRla6Ts1ZrpW/5Hn0T0XWBzydTPOaSbSyxUU72SuzFwe/ctU8bSjs6VFv7XV43LKR/DWFVbD1qUtynTkrvodt0vB2ZIFf02x2xwNV3s6i2S6+Py/huySWjNXQhKdWMY6tqxjy6za9GsD+z4SjStZqCcvjlxperZlGjGB2+LpU7Xi5qUvgXGfyt4m2kNFas3/wD6CtnCku2T9F7zhj+nGO22Nqb7xp2pr3R5fxORqnCuLVCjUrP/AG4Sl72luXnYw6pNyk5Pe7tt9bbu2Kz0RFsGjecqr4ZLx+R+QAQHTAAAAAAAAAAAAAAAA1PgLS3B7OnSzulkhGCVRJLiq3tK6MsBlGbhoU8ZgqeKilNtW0sb1Qrxms0JRlF9MWmvNH2MFwuKqUnmhOUJdcZSi/QsXB+nWJpWU8tWP9a4390f8pkyrLiaKtsKrHOnJPvyfw5msApuA1gYee6pCpSfXbPDzW/0JXHaR0I4edenVhUyR3RjJXcnujFrlW9okUotXTNZUweIpyUZQeeS/nQaQ6R0cGrTvKo1dQjbNbrb/hRRsZp7ipt5MlNdSjmfnL9EVvGYmdWpKrOTlKTzNvr6vd2dFj4leVWT0OnwuyaFKK31vS63p4L3lmw2nWMg98o1F1SgvnGxctHdL6WLapyWyqvki3eMvhl19j9TJz9JtO6bTW9Nbmn1p9YjUkjPEbKw9WOS3X1r4aG+o6V/Q3hd4rDKUnepTeSfa0t0/FetyfZZTuro5CrTlSm4S1R0zXWXwqqk4YeMrqneU7cmd7kvelf+4iOGNJ8XOrNbWdON5LLFuGVJtW3b79e8jeCuC62KqZacHJt72/Zj/U5dHzIJ1N77KOjwOy/6aSxFaSyV+xZcX2dxbNV2AvOriGt0YqnF9snml6KPmaORnAXBUcJRjRjvy73LplN8sn/3qJK5NCO6rGjx2IWIryqLTRdyKfrKxuTDRpLlrTV/ggsz9cpmBZ9YeO2uM2afFoRVPszb5S+aXgVgrVHeTOp2VR6LCxvq8/P5WAAMDYgAAAAAAAAAAAAAAAAAAAAA6cAAAAAAABedVlZ7SvDocIy8VJr/ACaOY5onpAsFOcnSzqooxdpWkkm3u3b+X0NAwGmWEq7nU2cuqosq/u9n1LFKS3bHK7WwlaVeVWMG45ZrPgke7FaP4WrN1J4enKb3ttcr631nuw2GhTjlhCMIroikl5I7SqxklKMlJPpTTXmj6ktkaaU5SW628u06fDFV1ThKpL2YRcn7krs+5VtYOP2WDcE99eSp/d9qXoreIbsrmdCk61WNNcWkZbjK7qznUl7U5Sk/fJt/5PkAUrnfpJKyAAB6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAD0YPHVKLzUqk6b7JNX99uUseA09xNPdUjGqv6laX90d3oVQHqbWhBWw1Gt7SKfr568zUODtPsPUsqkZ0n22lDzjv9CtaweF4V6tONKanTpwW+LvFym9/kkvMqgMnVbVmVKGy6FGsqsL8ctVnz5gAGBsgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k=",
      // "order_id": "order_DBJOWzybf0sJbb", //This is a sample Order ID. Pass the `id` obtained in the previous step
      // "handler": function (response)
      // {
      //     alert(response.razorpay_payment_id);
      //     alert(response.razorpay_order_id);
      //     alert(response.razorpay_signature)
      // },

      handler: async function (response) {
        try {
          // setEmails(userInfo.Email)
          console.log("emails ", emails);
          const resp = await axios
            .post(`${url}book-ticket`, { emails, str, id, arr })
            .then((res) => setGet(res.data))
            .catch((err) => console.log("errs ", err));
        } catch (error) {
          console.log("e ", error);
        }

        alert("Ticket Book Successfully!!");
        history.push("/");
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <>
      <div className="Cenima">
        <h2>Select Your Seats</h2>
        <div className="Screen">
          <hr className="line" />
        </div>
        <div className="Seats">
          <div className="num">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            <p>12</p>
            <p>13</p>
            <p>14</p>
            <p>15</p>
            <p>16</p>
          </div>
          <div className="alpha">
            <p>A</p>
            <p>B</p>
            <p>C</p>
            <p>D</p>
          </div>
          <div className="First">
            {len === +id - 1 ? (
              <>
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="A-5"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="A-6"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="A-7"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="A-8"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="A-9"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="A-10"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="A-11"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="A-12"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="A-13"
                  disabled
                />
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="A-5"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="A-6"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="A-7"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="A-8"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="A-9"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="A-10"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="A-11"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="A-12"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="A-13"
                />
              </>
            )}
          </div>

          <div className="Second">
            {len === +id - 1 ? (
              <>
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="B-4"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="B-5"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="B-6"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="B-7"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="B-8"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="B-9"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="B-10"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="B-11"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="B-12"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="B-13"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="B-14"
                  disabled
                />
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="B-4"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="B-5"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="B-6"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="B-7"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="B-8"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="B-9"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="B-10"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="B-11"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="B-12"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="B-13"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="B-14"
                />
              </>
            )}
          </div>

          <div className="Third">
            {len === +id - 1 ? (
              <>
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-3"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-4"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-5"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-6"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-7"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-8"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-9"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-10"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-11"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-12"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-13"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-14"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-15"
                  disabled
                />
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-3"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-4"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-5"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-6"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-7"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-8"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-9"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-10"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-11"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-12"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-13"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-14"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="C-15"
                />
              </>
            )}
          </div>

          <div className="Fourth">
            {len === +id - 1 ? (
              <>
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-1"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-2"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-3"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-4"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-5"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-6"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-7"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-8"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-9"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-10"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-11"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-12"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-13"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-14"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-15"
                  disabled
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-16"
                  disabled
                />
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-1"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-2"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-3"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-4"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-5"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-6"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-7"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-8"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-9"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-10"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-11"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-12"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-13"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-14"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-15"
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleSubmit(e)}
                  value="D-16"
                />
              </>
            )}
          </div>
        </div>
        {len === +id - 1 ? (
          <input
            onClick={displayRazorpay}
            type="button"
            value={`Pay Rs.${amount}.00`}
          />
        ) : null}
      </div>
    </>
  );
};

export default SelectSeat;
