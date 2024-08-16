import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { BACKEND_IP } from "@env";
import Header from '../components/Header';
import moment from 'moment';
import { calendarTheme } from 'react-native-calendars'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

const customTheme = {
  ...calendarTheme, 
  agendaDayTextColor: '#F74231', 
  agendaDayNumColor: '#F74231', 
  agendaTodayColor: '#F74231', 
  agendaKnobColor: '#F74231', 
  todayTextColor: '#F74231',
};

const CalendarScreen = ({ navigation }) => {
  
  const user = useSelector((state) => state.users.value);
  const reduxActivities = useSelector((state) => state.activities.value);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [allActivities, setAllActivities] = useState({});
  const [dayActivities, setDayActivities] = useState({});
  useEffect(() => {
    // prend les infos dans le redux, les tri et les formate au format utilisé pour l'agenda 
    let container = {};
    reduxActivities.forEach(data => {
      const date = moment(data.date).format('YYYY-MM-DD');
      if (!container[date]) {
        container[date] = [];
      }
     
      container[date].push({
        name: data.name,
        time: moment(data.date).format('HH:mm'),
        location: data.location.street,
        activityID: data._id,
        organizer: data.organizer.token,
      });
    });
    
    setAllActivities(container);
  
    const selectedEvents = container[selectedDate] || [];
    setDayActivities({ [selectedDate]: selectedEvents });
  }, [reduxActivities, selectedDate]);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    const selectedEvents = allActivities[day.dateString] || [];
    setDayActivities({ [day.dateString]: selectedEvents });
  };

  const handlePress = (item) => {
    if(item.organizer === user.token) {
      navigation.navigate("Activity Admin", {activity: item.activityID, organizer: item.organizer})
    }
    else {
      navigation.navigate('Activity', { activity: item.activityID, organizer: item.organizer })
    }
  }

  const renderItem = (item) => {
    return (
      <View>
        <View style={styles.item}>
         <Text onPress={() => handlePress(item)} style={styles.itemName}>{item.name}</Text>
          <Text onPress={() => handlePress(item)} style={styles.itemTime}>{item.time}</Text>
          <Text onPress={() => handlePress(item)} style={styles.itemLocation}>{item.location}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        navigation={navigation}
        title={`Welcome ${user.username}`}
        avatar={user.avatar}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Calendrier</Text>
        <Agenda
          theme={customTheme}
          items={dayActivities}
          selected={selectedDate}
          renderItem={renderItem}
          onDayPress={onDayPress}
          markedDates={{
            [selectedDate]: {
              selected: true,
              marked: true,
              selectedColor: '#F74231',
            },
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    height: '100%',
    paddingTop: 35,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  title: {
    fontFamily: 'ClashGrotesk-Regular',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#F74231',
    borderRadius: 5,
    height: 80,
    marginBottom: 10,
    padding: 10,
    color: 'white',
  },
  itemName: {
    fontWeight: 'ClashGrotesk-Bold',
    color: 'white',
  },
  itemTime: {
    fontStyle: 'italic',
    color: 'white',
  },
  itemLocation: {
    marginTop: 5,
    color: 'white',
  },
});

export default CalendarScreen;
