import Drawer from "../components/drawer/drawer";
import MainScreen from "../components/mainscreen/mainscreen";

export function Welcome() {
  return (
    <div className="flex">
      <Drawer/>
      <Drawer/>
      <MainScreen/>
    </div>
  );
}
