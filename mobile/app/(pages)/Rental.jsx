import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import ItemCardRental1 from "../../components/ItemCardRental1"; 


export default function Rental() {
  const router = useRouter();
  const [data1, setData1] = React.useState([]);
  const [data2, setData2] = React.useState([]);
  
  React.useEffect(() => {
    const fetchData = async () => {
      const token = await localStorage.getItem("token");
      
      const res1 = await fetch(`http://localhost:3000/api/Rental?flag=1`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData1(await res1.json());
      
      const res2 = await fetch(`http://localhost:3000/api/Rental?flag=0`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData2(await res2.json());
    };

    fetchData();
  }, []);

  async function handleAddItem() {
    const token = await localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/api/users/address-check", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (!data.hasAddress) {
      alert("Ürün eklemek için önce adres eklemelisin");
      return;
    }

    router.push("/Forms/AddItem");
  }

  async function handleDelete(itemId){
    const token = await localStorage.getItem("token");

    const response = await fetch(`http://localhost:3000/api/items/delete-item/${itemId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });

    const data = await response.json();
    console.log(data);
  }

  async function handleAvailability(){
    console.log("fuck you");
  }

  return (
    <ScrollView>
      <View id="myRenteds">
        {data1.map((element, index) => (
          <>
          <ItemCardRental1 
            key={index}
            name={element.name}
            imageName={element.ImageName}
            price={element.price}
          />
          </>
        ))}
      </View>

      <TouchableOpacity onPress={handleAddItem} activeOpacity={0.7}>
        <Text>Yeni eşya ekle</Text>
      </TouchableOpacity>

      <View id="onesIRented">
        {data2.map((element, index) => (
          <ItemCardRental2
            key={index}
            name={element.name}
            imageName={element.ImageName}
            price={element.price}
          />
        ))}
      </View>
    </ScrollView>
  );
}
