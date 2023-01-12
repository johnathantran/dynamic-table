import React, { useRef, useEffect } from "react";

// hook that alerts clicks outside of the passed ref
function useOutsideClickWrapper(ref, setEditIdx) {

  useEffect(() => {

    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {

        if (event.target.className === "MuiAutocomplete-option") { return  }
        setEditIdx(-1);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

// component that alerts if you click outside of it
export default function OutsideClickWrapper(props) {
   
    const wrapperRef = useRef(null);
    useOutsideClickWrapper(wrapperRef, props.setEditIdx);

    return <div ref={wrapperRef}>{props.children}</div>;
}