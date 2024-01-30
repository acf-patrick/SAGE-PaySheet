import styled from "styled-components";

const StyledTable = styled.table`
  border: 1px solid black;
  td {
    border: 1px solid red;
  }
`;

function Test() {
  return (
    <StyledTable>
      <thead>
        <th>Test 1</th>
        <th>Test 2</th>
        <th>Test 3</th>
      </thead>
      <tbody>
        <td>Item 1</td>
        <tr>test tr</tr>
        <td>Item 2</td>
        <td>Item 3</td>
      </tbody>
      <tfoot>
        <td>foot 1</td>
        <td>foot 2</td>
        <td>foot 3</td>
      </tfoot>
    </StyledTable>
  );
}

export default Test;
