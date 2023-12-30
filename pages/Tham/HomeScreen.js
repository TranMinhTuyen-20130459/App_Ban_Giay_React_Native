import React from "react";
import { ScrollView, StyleSheet, View, ActivityIndicator } from "react-native";
import Header from "../../components/home/Header";
import BannerGrid from "../../components/home/BannerGrid";
import SuggestedProduct from "../../components/home/SuggestedProduct";
import { useFetchDataSuggested } from "../../utils/LoadData";

function HomeScreen() {

    // Kĩ thuật custom Hook
    const { data, handleScroll, loadingMore } = useFetchDataSuggested();

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
                <View style={styles.main}>
                    <View style={styles.mainFormat}>
                        <BannerGrid />
                        <SuggestedProduct data={data} />
                        {loadingMore && (
                            <ActivityIndicator size="1000" color="#0000ff" />
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        position: "sticky",
        top: 0,
        zIndex: 10,
    },
    mainFormat: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        backgroundColor: "#F5F5FA",
    },
});

export default HomeScreen;
