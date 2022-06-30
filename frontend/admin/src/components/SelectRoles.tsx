import React from 'react'
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { RoleType } from "../interfaces";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface SelectProps {
  roles: RoleType[];
  selected: string[];
  handleChange: (e: SelectChangeEvent<string[]>) => void;
  from: string
}

export default function SelectComponent({
  roles,
  selected,
  handleChange,
  from
}: SelectProps) {
  const theme = useTheme();

  const toRender = (selected: any) => {
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {selected.map((value: any) => {
          const matchRoles = roles.find((p: any) => p.ID === value);
          return <Chip key={value} label={matchRoles && matchRoles.Name} />;
        })}
      </Box>
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Roles</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selected}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Roles" />}
          renderValue={toRender}
          MenuProps={MenuProps}
        >
          {roles && roles.length ? (
            roles.map((p: any) => (
              <MenuItem
                key={p.ID}
                value={p.ID}
                style={getStyles(p, selected, theme)}
              >
                {console.log('roles', p)}
                {p.Name}
              </MenuItem>
            ))
          ) : (
            <MenuItem>no roles to pick from.</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}
