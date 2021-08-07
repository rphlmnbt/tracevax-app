import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, FlatList,ImageBackground, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { userId } from "../data/data";
import { TouchableHighlight } from "react-native-gesture-handler";
import { ListItem} from 'react-native-elements'
import background from '../assets/tracevax-bg.png'

export default function QrLogsScreen() {
    const [ columns, setColumns ] = useState([
    "Id",
    "Timestamp",
    "Location",
  ])
    const [users, setUsers] = useState(userId)

    
    const tableHeader = () => (
        <View style={styles.tableHeader}>
           {
                columns.map((column, index) => {
                { 
                  if(index == 0){
                    return (
                      <TouchableOpacity
                          key={index}
                          style={styles.columnHeader, styles.columnHeaderId}>
                          
                          <Text style={styles.columnHeaderTxt}>{column} </Text>
                      </TouchableOpacity>
                      )
                  }
                  else if(index == 1){
                    return (
                      <TouchableOpacity
                          key={index}
                          style={styles.columnHeader, styles.columnHeaderTimestamp}>
                          
                          <Text style={styles.columnHeaderTxt}>{column} </Text>
                      </TouchableOpacity>
                      )
                  
                  }
                  else {
                    return (
                      <TouchableOpacity
                          key={index}
                          style={styles.columnHeader, styles.columnHeaderLocation}>
                          
                          <Text style={styles.columnHeaderTxt}>{column} </Text>
                      </TouchableOpacity>
                      )
                  } 
                }
                })
            }
        </View>
    )

        return (
          <ImageBackground
            source={background}
            style={{width: '100%', height: '100%'}}
          > 
            <View style={styles.container}>
                <FlatList 
                    data={users}
                    style = {{width:"90%"}}
                    keyExtractor={(item, index) => index+""}
                    ListHeaderComponent = {tableHeader}
                    stickyHeaderIndices = {[0]}
                    renderItem={({item, index})=> {
                        return (
                            <View style={[styles.tableRow,  {backgroundColor: index % 2 == 1 ? "white" : "#e8f4ea"}]}>
                                <Text style={[styles.columnRowTxt, {width: 30}]}>{item.id}</Text>
                                <Text style={[styles.columnRowTxt, {width: 90}]}>{item.timestamp}</Text>
                                <Text style={[styles.columnRowTxt, { width: 120}]}>{item.location}</Text>
                            </View> 
                        )
                    }}
                />
                 <StatusBar style="auto" />
            </View>
            </ImageBackground>
        );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:80
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#41AD49",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: "auto",
    alignItems:"center",
  },
  columnHeader: {
    width: "20%",
    alignItems:"center"
  },
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
    textAlign:"center",
  },
  columnRowTxt: {
    width:"20%",
    textAlign:"center",
    paddingTop: 5,
    paddingBottom: 5,
  },
  columnHeaderId: {
    width: 30
  },
  columnHeaderTimestamp: {
    width: 90
  },
  columnHeaderLocation: {
    width: 120
  }
});