import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import URL from "./url";
import { Header } from "react-native-elements";
import { AuthContext } from "../contexts/AuthContextProvider";
import jwt_decode from "jwt-decode";
import { Video, AVPlaybackStatus } from "expo-av";
import Autolink from "react-native-autolink";
import { BottomSheet } from "react-native-btr";
import { FontAwesome5 } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import { Row, Col } from "react-native-responsive-grid-system";
import { useIsFocused } from "@react-navigation/native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Products = ({ navigation }) => {
  const [products, setProducts] = React.useState([]);
  const [loading, controlLoading] = React.useState(true);
  const [max, setMax] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [bottomModalVisible, setBottomModalVisible] = React.useState(false);
  const [formVisible, setFormVisible] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectedId, setSelectedId] = React.useState(null);
  const { state, dispatch } = React.useContext(AuthContext);
  let url =URL();
  const isFocused = useIsFocused();

  const toggleBottomSheet = () => {
    setBottomModalVisible(!bottomModalVisible);
  };

  const fetch_products = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(`${url}/products`, {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        controlLoading(false);
      })
      .catch(err => console.log(err));
    setTimeout(fetch_products, 50000);
  };

  React.useEffect(() => {
    if (isFocused) {
      fetch_products();
    }
  }, [navigation, isFocused]);

  return (
    <View>
      <Header
        placement="left"
        centerComponent={
          <TextInput
            onChangeText={text => searchFilterFunction(text)}
            value={search}
            placeholder="Search Items..."
            style={styles.searchForm}
          />
        }
        rightComponent={
          <Icon
            name="menu"
            style={{ marginTop: 6 }}
            size={25}
            onPress={() => toggleBottomSheet()}
          />
        }
        containerStyle={{
          backgroundColor: "#fff",
          //justifyContent: 'space-around',
          height: 102
        }}
      />

      <ScrollView>
        <Row rowStyles={styles.productsHolder}>
          {products.map(p => (
            <Col xs={6} sm={4} md={4} lg={2} xl={2}>
              <View style={styles.productHeader}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("SingleProduct", {
                      product_img: p.product_img,
                      name: p.name,
                      price: p.price,
                      phone_number: p.phone_number,
                      user_img: p.user_img,
                      user_id: p.user_id,
                      description: p.description,
                      full_name: p.full_name
                    })
                  }
                >
                  <Image
                    source={{ uri: `${url}/${p.product_img}` }}
                    style={styles.productImg}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.productFooter}>
                <Text style={styles.mytext}>{p.name}</Text>
                <Text style={styles.mytext}>GHC {p.price}</Text>
              </View>
            </Col>
          ))}
        </Row>
      </ScrollView>

      <BottomSheet
        visible={bottomModalVisible}
        onBackdropPress={toggleBottomSheet}
      >
        <View style={styles.bottomModal}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CreateProduct");
                toggleBottomSheet();
              }}
              style={styles.button1}
            >
              <Text style={styles.buttonText}>Add Item</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                navigation.navigate("MyProducts");
                toggleBottomSheet();
              }}
            >
              <Text style={styles.buttonText}>My Items</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};
const styles = StyleSheet.create({
  searchForm: {
    borderRadius: 25,
    borderColor: "whitesmoke",
    backgroundColor: "whitesmoke",
    width: "100%",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 10,
    fontSize: 15
  },
  bottomModal: {
    backgroundColor: "#fff",
    height: 250,
    width: "100%",
    alignSelf: "center",
    marginTop: HEIGHT / 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingLeft: 10,
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },

  button1: {
    alignSelf: "center",
    backgroundColor: "rgb(95, 32, 155)",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    width: 100,
    height: 50,
    borderRadius: 20
  },
  button2: {
    alignSelf: "center",
    backgroundColor: "rgb(95, 32, 155)",
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 50,
    borderRadius: 20
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  productsHolder: {
    padding: 10,
    marginTop: 10,
    //flexDirection:"row",
    //flexWrap:"wrap",
    backgroundColor: "whitesmoke",
    justifyContent: "space-between",
    marginBottom: 100
  },
  productsContainer: {
    marginTop: 3,
    overflow: "hidden"
  },
  productHeader: {},
  productImg: {
    height: 170,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10
  },
  productFooter: {
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingTop: 8,
    paddingBottom: 8
  },
  mytext: {
    textAlign: "center",
    fontWeight: "bold"
  }
});
export default Products;
