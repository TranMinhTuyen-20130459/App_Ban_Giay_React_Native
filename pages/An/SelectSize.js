import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {ItemColorClothes} from "../../components/product/ItemColorClothes";
import {ItemSize} from "../../components/product/ItemSize";
import {ButtonAdd} from "../../components/product/ButtonAddCart";
import {useRoute} from "@react-navigation/native";
import {useState} from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addCart} from "../../redux/slices/CartsSlice";

export const SelectSize = (prop) => {
    /**
     * short decription
     * image primary
     * price
     * list size
     * list color
     * vendor
     *
     */

    const route = useRoute();
    const {data} = route.params;
    const listNameColor = ["Trắng", "Xanh", "Vàng", "Đỏ"];
    const [productData, setProductData] = useState(() => {
        const updatedListImage = data.list_image.map((image, i) => {
            return {
                ...image,
                name: listNameColor[i], // Assign the color name based on the index.
            };
        });

        return {
            ...data,
            list_image: updatedListImage,
        };
    });

    const [color, setColor] = useState(null);
    const [size, setSize] = useState(null);

    // xử lý chọn màu
    const handleColorPress = (color) => {
        setColor(color);
    };
    // xử lý chọn size
    const handleSizePress = (size) => {
        setSize(size);
    };
    // redux
    const dispatch = useDispatch();
    const carts = useSelector((state) => state.carts);
    // thêm sp vào giỏ
    const handleAddToCart = () => {
        const newCartItem = {
            id: productData.id_product,
            title: productData.name_product,
            price: productData.listed_price,
            discountPrice: productData.promotional_price,
            size: size ? size : productData.list_size[0].name_size,
            color: color ? color : listNameColor[0],
            quantity: 1,
            path_img: productData && productData.list_image[0].path_image,
        };
        // kiểm tra có sản phẩm này trong carts redux không
        const existingCartItem = carts.find((item) => {
            return item.id === productData.id_product && item.size === size;
        });
        // nếu có thì thông báo sản phẩm này đã có
        if (existingCartItem) {
            alert("Sản phẩm này đã có trong giỏ hàng");
        } else {
            // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thì thêm mới
            dispatch(addCart(newCartItem));
            alert("Thêm vào giỏ hàng thành công");
        }
    };

    if (!productData) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }
    return (
        <View style={[styles.container]}>
            <ScrollView>
                <View
                    style={{
                        flexDirection: "row",
                        padding: 8,
                    }}
                >
                    {/*<Image*/}
                    {/*    style={{ flex: 1 }}*/}
                    {/*    source={{*/}
                    {/*        uri: productData.list_image[0].path_image,*/}
                    {/*    }}*/}
                    {/*></Image>*/}
                    {/*<View*/}
                    {/*    style={{*/}
                    {/*        flex: 2,*/}
                    {/*        padding: 5,*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <View>*/}
                    {/*        <Text numberOfLines={2}>*/}
                    {/*            {""}*/}
                    {/*            Đây là sản phẩm giày được yêu thích nhất năm 2023. Với đa dạng kích cỡ và màu sắc. Phù hợp với giới trẻ năng động trẻ trung*/}
                    {/*        </Text>*/}
                    {/*        <Text>*/}
                    {/*            Size:{size ? size : productData.list_size[0].name_size}*/}
                    {/*        </Text>*/}
                    {/*        <Text>Màu: {color ? color : productData.list_image[0].name}</Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                </View>
                <View
                    style={{
                        paddingHorizontal: 10,
                    }}
                >
                    <View>
                        <Text>Màu: </Text>
                        <View style={styles.flexWrap}>
                            {productData.list_image
                                ? productData.list_image.map((image) => {
                                    return (<>
                                            <ItemColorClothes
                                                key={image.id_image}
                                                color={image.name}
                                                link={image.path_image}
                                                selected={color === image.name}
                                                onPress={() => handleColorPress(image.name)}
                                            />

                                        </>
                                    );
                                })
                                : "không có ảnh"}
                        </View>
                        <View>
                            <Text>Size: </Text>
                            <View style={styles.flexWrap}>
                                {productData.list_size
                                    ? productData.list_size.map((s, i) => {
                                        return (<>
                                            <ItemSize
                                                key={i}
                                                name={s.name_size}
                                                selected={size === s.name_size}
                                                onPress={() => handleSizePress(s.name_size)}
                                            />
                                        </>);
                                    })
                                    : ""}
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.fixedBottom}>
                <ButtonAdd handleAddToCart={handleAddToCart}/>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    flexWrap: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    fixedBottom: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        paddingHorizontal: 10,
        height: 70,

        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
});
