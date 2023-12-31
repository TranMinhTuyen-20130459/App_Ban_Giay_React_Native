import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    ActivityIndicator,

} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useEffect, useState} from "react";
import {HeaderProductDetail} from "../../components/product/HeaderProductDetail";
import {ProductImage} from "../../components/product/ProductImage";
import {ItemEvaluate} from "../../components/product/evaluation/ItemEvaluate";
import {ButtonAction} from "../../components/product/ButtonAction";
import {Policy} from "../../components/product/Policy";
import {colors} from "../../theme";
import {addCart, updateCart} from "../../redux/slices/CartsSlice";
import {useDispatch, useSelector} from "react-redux";
import {useRoute} from "@react-navigation/native";
import uuidv4 from "uuid/v4";
import {addOrderProduct, removeAllOrderProduct} from "../../redux/slices/OrderProductSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addHistory} from "../../redux/slices/HistoryView";
import {API_GET_PATHS} from "../../common/PathApi";
import { addFavories, removeFavories } from "../../redux/slices/Favories";
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode-svg';
const fakeData = [
    {
        quantity_star: 5,
        rank: "Cực kỳ hài lòng",
        content: "Sản phẩm này rất tốt, tôi rất hài lòng!",
        fullname: "Nguyễn Văn Lênh",
    },
    {
        quantity_star: 4,
        rank: "Hài lòng",
        content: "Sản phẩm tốt, nhưng có vài điểm cần cải thiện.",
        fullname: "Trần Thị Hương",
    },
    {
        quantity_star: 3,
        rank: "Bình thường",
        content: "Sản phẩm ổn, không có gì nổi bật.",
        fullname: "Lê Minh Hiếu",
    },
    {
        quantity_star: 5,
        rank: "Cực kỳ hài lòng",
        content: "Sản phẩm chất lượng, đúng như mô tả.",
        fullname: "Phạm Thị An",
    },
    {
        quantity_star: 2,
        rank: "Không hài lòng",
        content: "Sản phẩm không đáp ứng mong đợi của tôi.",
        fullname: "Nguyễn Văn Đông",
    },
    {
        quantity_star: 4,
        rank: "Hài lòng",
        content: "Sản phẩm chất lượng, giá thành hợp lý.",
        fullname: "Trần Văn Bình",
    },
    {
        quantity_star: 1,
        rank: "Rất không hài lòng",
        content: "Sản phẩm gặp nhiều vấn đề kỹ thuật.",
        fullname: "Lê Thị Thanh Hằng",
    },
    {
        quantity_star: 3,
        rank: "Bình thường",
        content: "Sản phẩm tạm ổn, có thể cải thiện.",
        fullname: "Nguyễn Văn Phương",
    },
    {
        quantity_star: 5,
        rank: "Cực kỳ hài lòng",
        content: "Sản phẩm đẹp, giao hàng nhanh chóng.",
        fullname: "Trần Đình Quang",
    },
    {
        quantity_star: 4,
        rank: "Hài lòng",
        content: "Sản phẩm tốt, đáp ứng đúng mong đợi.",
        fullname: "Phạm Thị Trang",
    },
];

export const ProducDetail = ({navigation}) => {
    // hiển thị modal
    const [isModalVisible, setModalVisible] = useState(false);
    // xử lý hiển thị đánh giá
    const [visibleComments, setVisibleComments] = useState(3);

    const handleSeeMoreComments = () => {
        setVisibleComments(
            visibleComments === fakeData.length ? 3 : fakeData.length
        );
    };

    const quantity_sold = 500;
    const quantity_rating = 500;
    const [selectSize, setSelectSize] = useState(false);
    const [selectedColor, setSelectedColor] = useState(false);
    const [size, setSize] = useState();
    const [color, setColor] = useState();
    const [productData, setProductData] = useState();
    const [quantity, setQuantity] = useState(1);
    const [idV4, setIdV4] = useState();
    const [idV40, setIdV40] = useState();
    const [viewedProducts, setViewedProducts] = useState([]);
    const [favoriesProducts, setFavoriesProducts] = useState([]);
    const [isFavoriesProducts, setISFavoriesProducts] = useState(false);
    const route = useRoute();
    const {productId} = route.params;

    // redux
    const dispatch = useDispatch();
    const carts = useSelector((state) => state.carts);
    const orders = useSelector((state) => state.orderProducts)
    const history = useSelector((state) => state.historys)
    const favories = useSelector((state) => state.favories)
    // theo dõi giỏ hàng
    useEffect(() => {
        const existingCartItem = carts.find((item) => {
            return item.id === productId && item.size === size;
        });
        setQuantity(existingCartItem ? existingCartItem.quantity + 1 : 1);
        setIdV4(existingCartItem && existingCartItem.idv4);
    }, [carts]);
  

    const link =
        API_GET_PATHS.lay_thong_tin_san_pham + "id=" +
        productId;
    // formart Tiền tệ
    const formatCurrency = (value) => {
        // Kiểm tra nếu giá trị không phải là số
        if (isNaN(value)) {
            return "Invalid input";
        }

        // Sử dụng hàm toLocaleString để định dạng số tiền thành chuỗi tiền tệ
        return value.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };
    const calculateDiscountPercentage = (listedPrice, promotionalPrice) => {
        // Kiểm tra nếu giá trị không phải là số
        if (isNaN(listedPrice) || isNaN(promotionalPrice)) {
            return "Invalid input";
        }
        // Tính phần trăm giảm giá
        const discountPercentage =
            ((listedPrice - promotionalPrice) / listedPrice) * 100;
        // Làm tròn đến 2 chữ số thập phân
        const roundedPercentage = Math.round(discountPercentage * 100) / 100;

        return roundedPercentage + "%";
    };

    // xử lý thay đổi màu trên header
    const [scrollY] = useState(new Animated.Value(0));

    const headerBackgroundColor = scrollY.interpolate({
        inputRange: [0, 10],
        outputRange: ["rgba(255, 255, 255, 0)", colors.white],
        extrapolate: "clamp",
    });
    const handleScroll = Animated.event(
        [{nativeEvent: {contentOffset: {y: scrollY}}}],
        {useNativeDriver: false} // Make sure to set useNativeDriver to false
    );
    // Lấy dữ liệu từ AsyncStorage khi component được mount
    const getDataFromStorage = async () => {
        try {
            // Lấy dữ liệu từ AsyncStorage
            console.log("H" + storedProducts)
            // Nếu có dữ liệu, cập nhật state
            if (storedProducts !== null) {
                setViewedProducts(JSON.parse(storedProducts));
            }
        } catch (error) {
            console.error('Error reading data from AsyncStorage:', error);
        }
    };
    // fetch data product
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(link);

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();

                console.log(data)

                setProductData(data.data);
                addToHistoryView(data.data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const existingHistoryItem = favories.find((item) => {
            return item.id === productId;
        })
        fetchData();
        setISFavoriesProducts(existingHistoryItem)
    }, []);
    const addToHistoryView = (productData) => {
        const existingHistoryItem = history.find((item) => {
            return item.id === productId;
        })
        const newCartItem = {
            id: productData.id_product,
            title: productData.name_product,
            price: productData.listed_price,
            discountPrice: productData.promotional_price,
            size: size === undefined ? productData.list_size[0].name_size : size,
            color: color ? "Trắng" : "Xanh",
            quantity: 1,
            path_img: productData ? productData.list_image[0].path_image : "",
        };
        if (!existingHistoryItem) {

            // Nếu sản phẩm đã tồn tại trong giỏ hàng, thì cập nhật
            dispatch(addHistory(newCartItem));
        }
    };
    const addToFavories = () => {
        console.log("F"+favories)
        const existingHistoryItem = favories.find((item) => {
            return item.id === productId;
        })
        const newCartItem = {
            id: productData.id_product,
            title: productData.name_product,
            price: productData.listed_price,
            discountPrice: productData.promotional_price,
            size: size === undefined ? productData.list_size[0].name_size : size,
            color: color ? "Trắng" : "Xanh",
            quantity: 1,
            path_img: productData ? productData.list_image[0].path_image : "",
        };
        if (!existingHistoryItem) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, thì cập nhật
            setISFavoriesProducts(true)
            dispatch(addFavories(newCartItem));
        }else{
            setISFavoriesProducts(false)
            dispatch(removeFavories(productId))
        }
    };
    const handleAddToCart = () => {
        const newCartItem = {
            id: productData.id_product,
            title: productData.name_product,
            price: productData.listed_price,
            discountPrice: productData.promotional_price,
            size: size === undefined ? productData.list_size[0].name_size : size,
            color: color ? "Trắng" : "Xanh",
            quantity: 1,
            path_img: productData ? productData.list_image[0].path_image : "",
        };
        if (idV4) {
            setQuantity(quantity + 1);
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, thì cập nhật
            dispatch(
                updateCart({
                    idv4: idV4,
                    quantity: quantity,
                })
            );
            alert("Cập nhật giỏ hàng thành công");
        } else {
            // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thì thêm mới
            setSize(newCartItem.size);
            dispatch(addCart(newCartItem));
            alert("Thêm vào giỏ hàng thành công");
        }
    };
    const handleBuyNow = () => {
        const newCartItem = {
            idv4: uuidv4(),
            id: productData.id_product,
            title: productData.name_product,
            price: productData.listed_price,
            discountPrice: productData.promotional_price,
            size: size ? size : productData.list_size[0].name_size,
            color: color ? "Trắng" : "Xanh",
            quantity: 1,
            status: true,
            path_img: productData && productData.list_image[0].path_image,
        };
        const existingOrderItem = orders.find((item) => {
            return item.id === newCartItem.id && item.size === newCartItem.size;
        });

        if (existingOrderItem) {
            navigation.navigate("OrderConfirm");
        } else {
            dispatch(removeAllOrderProduct())
            dispatch(addOrderProduct(newCartItem));
            navigation.navigate("OrderConfirm", {order_items: [newCartItem]});

        }
    };
    // hiện tắt qr code
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    // nếu fecth chưa hết thì hiển thị loading..
    if (!productData) {
        return (
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                }}
            >
                <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    hidesWhenStopped={true}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.fixedHeaderProductDetail,
                    {backgroundColor: headerBackgroundColor},
                ]}
            >
                <HeaderProductDetail navigation={navigation}/>
            </Animated.View>
            <ScrollView
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{paddingBottom: 70}} // Để có không gian cuối ScrollView để hiển thị ButtonAction
            >
                {productData ? (
                    <>
                        <View>
                            <ProductImage list={productData.list_image}/>
                            <View style={styles.margin10}>
                                <View>
                                    <View>
                                        <View style={{flexDirection: 'row',justifyContent:"space-between"}}> 
                                        <Text style={{fontSize: 30}}>
                                            {productData.name_product}
                                           
                                        </Text>
                                            <Ionicons style={styles.icon_mic} name={isFavoriesProducts? 'heart':'heart-outline'} size={26} color={'red'} 
                                        onPress={addToFavories} />
                                        </View>
                                        
                                        <Text>
                                            <View style={styles.starContainer}>
                                                {Array.from({length: 5}, (v, i) => (
                                                    <Ionicons
                                                        key={i}
                                                        name={
                                                            i < productData.star_review
                                                                ? "star"
                                                                : "star-outline"
                                                        }
                                                        color={
                                                            i < productData.star_review ? "gold" : "gray"
                                                        }
                                                    />
                                                ))}
                                            </View>
                                            {" ("}
                                            {quantity_rating}
                                            {") "}| Đã bán {quantity_sold}+
                                           
                                        </Text>
                                       
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Text style={{fontSize: 22, fontWeight: "bold"}}>
                                                {formatCurrency(productData.listed_price)}
                                            </Text>
                                            <Text
                                                style={{
                                                    marginLeft: 3,
                                                    backgroundColor: colors.borderGray,
                                                    borderRadius: 5,
                                                }}
                                            >
                                                {calculateDiscountPercentage(100, 25)}
                                            </Text>
                                        </View>

                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.navigate("SelectSize", {
                                                    data: productData,
                                                })
                                            }
                                            style={styles.btnSelect}
                                        >
                                            <View>
                                                <Text>
                                                    Size{" "}
                                                    {selectSize ? "" : productData.list_size[0].name_size}{" "}
                                                    | Trắng
                                                </Text>
                                            </View>
                                            <Text
                                                style={{color: colors.blueRoot, fontWeight: "bold"}}
                                            >
                                                Chọn
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{marginVertical: 8, backgroundColor: "white"}}>
                            <Policy/>
                        </View>

                        <View style={styles.margin10}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                                    Thông tin sản phẩm
                                </Text>
                                <Ionicons style={styles.icon_qr} name="qr-code-outline" size={26} color={'#aaa'}
                                   onPress={toggleModal} />
                            </View>
                             {/* Modal hiển thị mã QR */}
                             <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}  style={styles.modal}>
                                <View style={styles.modalContent}>
                                    {/* Hiển thị thông tin sản phẩm */}
                                    <Text style={styles.productName}>Tên sản phẩm: {productData.name_product}</Text>
                                    <Text style={styles.productPrice}>Giá:  {formatCurrency(productData.listed_price)}</Text>

                                    {/* Hiển thị mã QR */}
                                    <QRCode
                                        value={JSON.stringify(productData)}
                                        size={200}
                                    />

                                    {/* Nút hoặc icon để đóng modal */}
                                    <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                                        <Text style={styles.closeButtonText}>Đóng</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                            <Text>
                                Nike Air Force 1 Ra mắt vào năm 1982 bởi nhà thiết kế Bruce
                                Kilgore, ngay lập tức mẫu giày Nike Air Force 1 (AF1) đã trở
                                thành một ‘hit’ mạnh trên khắp thế giới khi ‘sold out’ ngay
                                trong ngày đầu trình làng. Thiết kế mẫu giày Nike Air Force 1
                                được xem là đôi giày mang tính cách mạng trong thế giới sneaker,
                                khi mà các nhà thiết kế kết hợp với các nhà khoa học cho ra mẫu
                                giày có công nghệ ‘Air’ – một túi khí ở gót chân để đệm hỗ trợ.
                            </Text>
                        </View>

                        <View style={styles.margin10}>
                            <Text style={{fontSize: 20}}>ĐÁNH GIÁ KHÁCH HÀNG</Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{fontSize: 30, alignContent: "center"}}>
                                    {productData.star_review}
                                </Text>

                                <Text style={{fontSize: 20, marginTop: 2}}>
                                    <View style={styles.starContainer}>
                                        {Array.from({length: 5}, (v, i) => (
                                            <Ionicons
                                                key={i}
                                                name={
                                                    i < productData.star_review ? "star" : "star-outline"
                                                }
                                                size={20}
                                                color={i < productData.star_review ? "gold" : "gray"}
                                            />
                                        ))}
                                    </View>
                                    <Text style={{color: colors.grayLight}}>
                                        {" "}
                                        {quantity_rating} Đánh giá
                                    </Text>
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("ProductReview")}
                                style={{
                                    borderWidth: 1,
                                    borderColor: colors.borderGray,
                                    padding: 10,
                                    color: colors.white,
                                }}
                            >
                                <Text>Đánh giá</Text>
                            </TouchableOpacity>
                            <View>
                                {fakeData
                                    ? fakeData.slice(0, visibleComments).map((e, i) => {
                                        return <ItemEvaluate key={i} data={e}/>;
                                    })
                                    : "Không có bình luận nào"}

                                {fakeData.length > 3 && (
                                    <TouchableOpacity
                                        style={styles.btnMore}
                                        onPress={handleSeeMoreComments}
                                    >
                                        <Text>
                                            {visibleComments === fakeData.length
                                                ? "Thu nhỏ"
                                                : "Xem thêm"}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </>
                ) : (
                    ""
                )}
            </ScrollView>

            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 2000,
                    paddingHorizontal: 10,
                    backgroundColor: "white",
                }}
            >
                <ButtonAction
                    handleAddToCart={handleAddToCart}
                    handleBuyNow={handleBuyNow}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 16,
        backgroundColor: colors.borderGray,
    },
    starContainer: {
        flexDirection: "row",
    },
    fixedHeaderProductDetail: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: 90,
        paddingTop: 30,
        paddingHorizontal: 10,
    },
    margin10: {
        padding: 10,
        backgroundColor: "white",
    },
    btnSelect: {
        marginVertical: 10,
        padding: 10,

        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",

        height: 45,
        borderColor: colors.borderGray,
        borderWidth: 1,
        borderRadius: 8,
    },
    btnMore: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",

        borderWidth: 1,
        borderColor: colors.borderGray,
        paddingVertical: 5,
        borderRadius: 5,
    },
    icon_mic: {
       
        padding: 1,
        borderRadius: 50,
        fontSize: 30
    },icon_qr: {
        padding: 1,
        borderRadius: 50,
        fontSize: 30,
        marginRight: 25
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      productPrice: {
        fontSize: 16,
        marginBottom: 20,
      },
      closeButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
      },
      closeButtonText: {
        color: 'white',
        fontSize: 16,
      },
});
