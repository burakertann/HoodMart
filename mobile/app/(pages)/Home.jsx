export default function Home() {
    // Veriler için state
    const [data, setData] = useState([]);
    // Arama kutusuna yazılan yazı için state
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const fetching = async () => {
            try {
                // SENİN API KODUN
                const response = await fetch("api");
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.log(error);
            }
        }
        fetching();
    }, []);

    return (
        // 1. Ana Kapsayıcı (Gri arka plan)
        <View style={styles.container}>
            
            {/* 2. Mavi Üst Kısım (Header) */}
            <View style={styles.headerBackground}>
                <SafeAreaView>
                    <View style={styles.searchContainer}>
                        {/* Arama İkonu */}
                        <Ionicons name="search" size={20} color="#666" style={{marginRight: 10}} />
                        
                        {/* Yazı Kutusu */}
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Ara..."
                            placeholderTextColor="#999"
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                    </View>
                </SafeAreaView>
            </View>

            {/* 3. Senin Listen (ScrollView) */}
            <ScrollView style={styles.scrollView}>
                {data.map((element, index) => {
                    return (
                        <ItemCard 
                            key={index} 
                            name={element.name} 
                            imageName={element.ImageName}
                            price={element.price}
                        />
                    );
                })}
            </ScrollView>

            {/* Android üst çubuk rengini mavi yapar */}
            <StatusBar style="light" backgroundColor="#2196F3" />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1, // Sayfanın tamamını kapla
        backgroundColor: '#f5f5f5',
    },
    headerBackground: {
        backgroundColor: '#2196F3', // MAVİ RENK
        paddingBottom: 15,
        // Android'de çentiğin altında kalmasın diye üstten boşluk bırakıyoruz:
        paddingTop: Platform.OS === 'android' ? 40 : 0, 
        borderBottomLeftRadius: 20, // Alt köşeleri yuvarlatma
        borderBottomRightRadius: 20,
    },
    searchContainer: {
        flexDirection: 'row', // Yan yana diz (ikon + input)
        backgroundColor: 'white',
        marginHorizontal: 15, // Kenarlardan boşluk
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        height: 45,
    },
    searchInput: {
        flex: 1,
        color: '#333',
        height: '100%',
    },
    scrollView: {
        flex: 1,
        marginTop: 10, // Listeyi header'dan biraz ayır
    }
});