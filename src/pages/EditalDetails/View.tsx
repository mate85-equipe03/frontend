import { useState } from "react";
import GeneralView from "./GeneralView";
import TeacherView from "./TeacherView";

export default function EditalDetails() {
  const [isTeacher] = useState<boolean>(true);

  return <div>{isTeacher ? <TeacherView /> : <GeneralView />}</div>;
}
