import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

const CheckBox = (props) => {
  const [checked, setchecked] = useState([]);

  const handleToggle = (value) => {
    //Checked Box 의 Index를 구하고

    const currentIndex = checked.indexOf(value);
    //전체 Checked된 State에서 현재 누를 CheckBox 가 이미 있다면

    const newChecked = [...checked];
    //빼주고

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    //State에 넣어준다.

    setchecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckBox = () =>
    props.list.map((value, index) => (
      <React.Fragment>
        <Checkbox
          key={index}
          onChange={() => handleToggle(value._id)}
          checked={checked.indexOf(value._id) === -1 ? false : true}
        />
        <span>{value.name}</span>
      </React.Fragment>
    ));
  return (
    <div>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="This is panel header 1" key="1">
          {renderCheckBox()}
        </Panel>
      </Collapse>
    </div>
  );
};

export default CheckBox;
