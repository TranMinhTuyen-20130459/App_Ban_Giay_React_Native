import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StarRating = ({ rating}) => {
  const stars = [1, 2, 3, 4, 5]; // Số lượng sao

  return (
    <View style={styles.starRatingContainer}>
      {stars.map((value,index) => (
        <TouchableOpacity
          key={index}
        >
          <Icon
            name={value <= rating ? 'star' : 'star-o'}
            size={18}
            color={ value<= rating ? '#f1c40f' : '#ccc'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const VoteScreen = ({starDefault}) => {
  return (
    <View style={styles.container}>
      <StarRating rating={starDefault} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  starRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
 
});

export default VoteScreen;
