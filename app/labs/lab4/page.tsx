"use client"
import store from "./store";
import { Provider } from "react-redux";
import Link from "next/link";
import ParentStateComponent from "./ParentStateComponent";
import ArrayStateVariable from "./ArrayStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import DateStateVariable from "./DateStateVariable";
import StringStateVariables from "./StringStateVariables";
import BooleanStateVariables from "./BooleanStateVariables";
import PassingDataOnEvent from "./PassingDataOnEvent";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import PassingFunctions from "./PassingFunctions";
import ReduxExamples from "./redux/page";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }
  return (
    <Provider store={store}>
    <div id="wd-lab4">
      <h2>Lab 4</h2>
      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions theFunction={sayHello} />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ParentStateComponent />
      <Link href="./redux">Redux Examples</Link>
      <ReduxExamples />
      <Link href="/labs/lab4/react-context" id="wd-lab4-link">
           React Context Examples </Link>
      <br></br>
      <Link href="./lab4/zustand">Zustand Examples</Link>

      </div>
      </Provider>
  );
}