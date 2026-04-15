import { useEffect, useState } from "react";
import styles from "./Home.module.css"
type RocketType = {
  id: string;
  name: string;
  description: string;
};

function App() {
  const [loading, setLoading] = useState<boolean>();
  const [rocket, setRocket] = useState<RocketType[]>([]);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/rockets")
    .then(res => res.json())
      .then((json: RocketType[]) => {
        setRocket(json);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return<div>데이터를 로딩중입니다</div>;
  }

  return (
    <div className={styles.aaa}>
    <div className={styles.flex}>
      {rocket.map((value, index) => (
        <div key={index} className={styles.container}>
          <h1>SpaceX {index + 1}</h1>
            <div>id: {value.id}</div>
            <div>name: {value.name}</div>
            <div>description: {value.description}</div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default App;
