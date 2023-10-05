import DatePicker from '../src';
import {Text, View} from 'react-native';
import {useState} from 'react';

const App = () => {
  const [picker, setPicker] = useState(second);

  const [date, setdate] = useState('');
  const [dates, setdates] = useState([]);

  const showPicker = () => {
    setPicker(true);
  };
  const hidePicker = () => {
    setPicker(false);
  };

  return (
    <View>
      <Text>{date}</Text>
      <DatePicker
        mode="rangePicker"
        visible={picker}
        onConfirm={showPicker}
        onCancel={hidePicker}
        type="modal"
        onChnage={e => setdates(e)}
      />
      <DatePicker mode="single" type="view" onChnage={e => setdate(e)} />
      {dates.map((item, index) => {
        return <Text key={index}>{item}</Text>;
      })}
    </View>
  );
};

export default App;
