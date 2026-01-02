import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StatusBar,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ItemCard from "../../components/ItemCard";

export default function Home() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 10;

  // ----------------------------------
  // VERİ ÇEKME
  // ----------------------------------
  const fetchData = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/Home?page=${reset ? 1 : page}&limit=${LIMIT}&search=${searchText}`
      );

      const result = await response.json();

      if (result.length < LIMIT) {
        setHasMore(false);
      }

      setData(prev =>
        reset ? result : [...prev, ...result]
      );

      setPage(prev => reset ? 2 : prev + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------
  // İLK AÇILIŞ
  // ----------------------------------
  useEffect(() => {
    fetchData(true);
  }, []);

  // ----------------------------------
  // SEARCH DEBOUNCE
  // ----------------------------------
  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasMore(true);
      setPage(1);
      fetchData(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchText]);

  // ----------------------------------
  // LOADING FOOTER
  // ----------------------------------
  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#2196F3" />;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingTop: Platform.OS === "android" ? 40 : 0 }}>
        <SafeAreaView>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="search" size={20} />
            <TextInput
              placeholder="Ara..."
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </SafeAreaView>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ItemCard
            name={item.item_name}
            imageName={item.ImageName}
            price={item.price}
            profilePic={item.profile_pic}
            userName={item.user_name}
          />
        )}
        onEndReached={() => fetchData()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />

      <StatusBar style="light" />
    </View>
  );
}
