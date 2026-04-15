import { useEffect, useState } from "react";
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
    <div>
      {rocket.map((value, index) => (
        <div key={index}>
          <h1>SpaceX</h1>
          <div>id: {value.id}</div>
          <div>name: {value.name}</div>
          <div>description: {value.description}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
