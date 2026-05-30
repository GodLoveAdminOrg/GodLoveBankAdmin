import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const EMOTIONS = ["rejection", "abandonment", "worthlessness", "abuse"];

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const EmotionDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (emotion) => {
    setAnchorEl(null);
    navigate(`/emotion/${emotion}`);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        endIcon={<KeyboardArrowDownIcon />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        Create Group
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {EMOTIONS.map((emotion) => (
          <MenuItem key={emotion} onClick={() => handleSelect(emotion)}>
            {cap(emotion)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default EmotionDropdown;
