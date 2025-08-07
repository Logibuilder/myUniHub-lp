

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./components/LandingPage";
import Qcm from './components/qcm';


export default function Home() {
  return (
    <div
    >
      <main className="">
        <LandingPage/>
      </main>
    </div>
  );
}
