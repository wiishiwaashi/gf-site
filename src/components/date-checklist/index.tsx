import { useState } from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
`;

const Title = styled.p`
  display: flex;
  align-items: center;
  color: black;
  font-size: 30px;
  font-weight: bold;
  padding: 5px 10px;
  background-color: rgba(120, 120, 120, 0.2);

  img {
    height: 30px;
    margin-left: 5px;
  }
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const InputBox = styled.input`
  flex-grow: 2;
  border: none;
  outline: none;
  background-color: rgba(120, 120, 120, 0.2);
  padding: 10px;

  &::placeholder {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: rgba(120, 120, 120, 0.75);
    font-size: 16px;
  }
`;

const AddButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: rgba(120, 120, 120, 0.2);
  font-size: 20px;
  font-weight: bold;
`;

const List = styled.ul`
  padding-left: 0;
`;

const ListItem = styled.li<{ $checked: boolean }>`
  list-style: none;
  padding: 12px 8px 12px 50px;
  cursor: pointer;
  background-color: rgba(120, 120, 120, 0.2);
  font-size: 16px;
  user-select: none;
  position: relative;

  ${({ $checked }) =>
    $checked &&
    css`
      text-decoration: line-through;
    `}

  &::before {
    content: "";
    position: absolute;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-image: url(${({ $checked }) =>
      $checked ? "images-gallery/checked.png" : "images-gallery/unchecked.png"});
    background-size: cover;
    background-position: center;
    top: 12px;
    left: 8px;
  }
`;

const DeleteButton = styled.span`
  position: absolute;
  right: 6px;
  top: 6px;
  width: 35px;
  height: 35px;
  font-size: 16px;
  color: black;
  line-height: 35px;
  text-align: center;
  border-radius: 20px;

  &:hover {
    background-color: gray;
  }
`;

type ChecklistItem = { id: number; text: string; checked: boolean };

const DateChecklist = () => {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [value, setValue] = useState("");

  const addItem = () => {
    if (!value.trim()) return;
    setItems((prev) => [...prev, { id: Date.now(), text: value, checked: false }]);
    setValue("");
  };

  const toggleItem = (id: number) =>
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );

  const deleteItem = (id: number) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  return (
    <Container>
      <Title>
        date checklist! <img src="images-gallery/icon.png" />
      </Title>
      <Row>
        <InputBox
          type="text"
          value={value}
          placeholder="What should we do?"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
        />
        <AddButton onClick={addItem}>+</AddButton>
      </Row>
      <List>
        {items.map((item) => (
          <ListItem key={item.id} $checked={item.checked} onClick={() => toggleItem(item.id)}>
            {item.text}
            <DeleteButton
              onClick={(e) => {
                e.stopPropagation();
                deleteItem(item.id);
              }}
            >
              x
            </DeleteButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default DateChecklist;
