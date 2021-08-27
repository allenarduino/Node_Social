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
import { Header } from "react-native-elements";
import { AuthContext } from "..";
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

const MyProducts = ({ navigation }) => {
  const [products, setProducts] = React.useState([]);
  const [loading, controlLoading] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [bottomModalVisible, setBottomModalVisible] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectedId, setSelectedId] = React.useState(null);
  const { state, dispatch } = React.useContext(AuthContext);
  let url = state.url;
  const isFocused = useIsFocused();

  const toggleBottomSheet = () => {
    setBottomModalVisible(!bottomModalVisible);
  };

  const openModal = id => {
    setModalVisible(true);
    setSelectedId(id);
  };

  const delete_product = id => {
    setModalVisible(false);
    let product_list = products;
    for (let i = 0; i < product_list.length; i++) {
      let p = product_list[i];
      if (p.id === id) {
        product_list.splice(i, 1);
        break;
      }
    }
    setProducts(product_list);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const data = { product_id: id };
    fetch(`${url}/delete_product`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
      })
      .catch(err => console.log(err));
  };

  const fetch_products = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", state.token);
    fetch(`${url}/my_products`, {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        setProducts(data.my_products);
        controlLoading(false);
      })
      .catch(err => console.log(err));
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
              <TouchableOpacity
                onPress={() => openModal(p.id)}
                style={{ alignSelf: "center" }}
              >
                <FontAwesome5 name="ellipsis-h" size={18} color="#888" />
              </TouchableOpacity>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}></View>
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <Icon
            name="trash"
            size={30}
            onPress={() => delete_product(selectedId)}
          />
          <Text style={{ fontWeight: "bold" }}>Delete Product</Text>
        </View>
      </Modal>

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

            <TouchableOpacity style={styles.button2}>
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
  },

  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    height: HEIGHT,
    width: WIDTH
  },
  modalContent: {
    backgroundColor: "#fff",
    height: 150,
    width: "80%",
    alignSelf: "center",
    marginTop: HEIGHT / 3,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default MyProducts;
