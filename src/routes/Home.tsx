import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import {Link} from "react-router";
type RocketType = {
  id: string;
  name: string;
  description: string;
  flickr_images: string[];
};

function App() {
  const [loading, setLoading] = useState<boolean>();
  const [rocket, setRocket] = useState<RocketType[]>([]);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/rockets")
      .then((res) => res.json())
      .then((json: RocketType[]) => {
        setRocket(json);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return <div>데이터를 로딩중입니다</div>;
  }

  return (
    <div className={styles.flex}>
      {rocket.map((value, index) => (
        <div key={index} className={styles.container}>
          <img src={value.flickr_images[0]} className={styles.img}/>
          <Link to={`/${value.id}`}><h1>SpaceX {index + 1}</h1></Link>
          <div>
            <strong>id:</strong> {value.id}
          </div>
          <div>
            <strong>name:</strong> {value.name}
          </div>
          <div className={styles.box}>
            <strong>description:</strong> {value.description}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
