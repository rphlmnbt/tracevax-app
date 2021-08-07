import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { userId } from '../data/data';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { ListItem} from 'react-native-elements';


export default function QrLogsScreen() {
    const [ columns, setColumns ] = useState([
    'Id',
    'Timestamp',
    'Location',
  ])
    const [users, setUsers] = useState(userId);
    
    const tableHeader = () => (
        <View style={styles.tableHeader}>
           {
                columns.map((column, index) => {
                {
                    return (
                    <TouchableOpacity
                        key={index}
                        style={styles.columnHeader}>
                        <Text style={styles.columnHeaderTxt}>{column + " "} </Text>
                    </TouchableOpacity>
                    )
                }
                })
            }
        </View>
    )

        return (
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
                                <Text style={[styles.columnRowTxt, {fontWeight:"bold"}]}>{item.id}</Text>
                                <Text style={styles.columnRowTxt}>{item.timestamp}</Text>
                                <Text style={styles.columnRowTxt}>{item.location}</Text>
                            </View> 
                        )
                    }}
                />
                 <StatusBar style="auto" />
            </View>
        );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:80
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#338DCD",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 40,
    alignItems:"center",
  },
  columnHeader: {
    width: "20%",
    justifyContent: "center",
    alignItems:"center"
  },
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
  },
  columnRowTxt: {
    width:"20%",
    textAlign:"center",
  }
});