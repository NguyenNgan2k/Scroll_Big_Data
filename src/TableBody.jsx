import React from "react";
import * as _ from "lodash";

//max- lấy cái lớn nhất trong ds
console.log(document.documentElement.clientHeight,  window.innerHeight)
const screenHeight = Math.max(
  document.documentElement.clientHeight,
  window.innerHeight || 0
); // get the height of the screen

const offset = screenHeight; // We want to render more than we see, or else we will see nothing when scrolling fast

// chiều cao của 1 hàng
const itemRowHeight = 32; // same height as each row (32px, see styles.css)
// floor - làm tròn
//số rows sẽ render ra , đang bị x2
const rowsToRender = Math.floor((screenHeight + offset) / itemRowHeight);
console.log(rowsToRender)

const TableBody = ({ data }) => {
  const [displayStart, setDisplayStart] = React.useState(0);
  const [displayEnd, setDisplayEnd] = React.useState(0);
  const [scrollPosition, setScrollPosition] = React.useState(0);

  const setDisplayPositions = React.useCallback(
    (scroll) => {
      //ko lấy phần sau dấu chấm
      console.log('rowsToRender',rowsToRender,offset)
      //chiều cao đc kéo lên -  Số phần tử đag hiển thị trong dom - 1 nửa chiều cao nọi dung(chiều cao của thanh scoll)
      const scrollWithOffset = Math.floor(scroll - rowsToRender - offset / 2);
      console.log(scroll,window.scrollY,scrollWithOffset)

      //lm tròn đúng
      const displayStartPosition = Math.round(
        Math.max(0, Math.floor(scrollWithOffset / itemRowHeight))
      );

      console.log('displayStartPosition',displayStartPosition,scrollWithOffset)

      // end position should never be larger than our data array
      const displayEndPosition = Math.round(
        Math.min(displayStartPosition + rowsToRender, data.length)
      );

      setDisplayStart(displayStartPosition);
      setDisplayEnd(displayEndPosition);
    },
    [data.length]
  );

  // We want to set the display positions on renering
  React.useEffect(() => {
    setDisplayPositions(scrollPosition);
  }, [scrollPosition, setDisplayPositions]);

  // add event listeners so we can change the scroll position, and alter what rows to display
  React.useEffect(() => {
    const onScroll = _.throttle(() => {
      const scrollTop = window.scrollY; // số px đã đc kéo lên
      if (data.length !== 0) {
        setScrollPosition(scrollTop);
        setDisplayPositions(scrollTop);
      }
    }, 100);

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [setDisplayPositions, data.length]);

  const rows = [];

  // add a filler row at the top. The further down we scroll the taller this will be
  rows.push(
    <tr
      key="startRowFiller"
      style={{ height: displayStart * itemRowHeight }}
    ></tr>
  );

  // add the rows to actually render
  for (let i = displayStart; i < displayEnd; ++i) {
    const row = data[i];
    if (row !== undefined) {
      rows.push(
        <tr key={row.id} className="Row">
          <td>{row.id}</td>
          <td>{row.first_name}</td>
          <td>{row.last_name}</td>
          <td>{row.email}</td>
          <td>{row.gender}</td>
        </tr>
      );
    }
  }

  // add a filler row at the end. The further up we scroll the taller this will be
  rows.push(
    <tr
      key="endRowFiller"
      style={{ height: (data.length - displayEnd) * itemRowHeight }}
    ></tr>
  );

  return <tbody>{rows}</tbody>;
};

export default TableBody;
