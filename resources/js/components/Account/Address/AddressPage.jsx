import React from "react";
import DataTable from "../../Template/DataTable";
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocationOffTwoToneIcon from '@mui/icons-material/LocationOffTwoTone';
import ToggleOnTwoToneIcon from '@mui/icons-material/ToggleOnTwoTone';
import ToggleOffTwoToneIcon from '@mui/icons-material/ToggleOffTwoTone';
import Tooltip from "@mui/material/Tooltip";
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';

// Function to generate consistent color based on user name
const stringToColor = (string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

// Function to create avatar with consistent color
const stringAvatar = (name) => {
  if (!name) return {};

  const nameParts = name.split(' ');
  const initials = nameParts.length > 1
    ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
    : `${nameParts[0][0]}`;

  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 32,
      height: 32,
      fontSize: '0.875rem',
    },
    children: initials.toUpperCase(),
  };
};

const AddressPage = () => {
    const columns = [
        {
            field: "user",
            headerName: "User",
            render: (row) => (
                <Tooltip title={row.user?.name || "No user assigned"}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {row.user?.name ? (
                            <Avatar {...stringAvatar(row.user.name)} />
                        ) : (
                            <PersonTwoToneIcon color="action" />
                        )}
                        <span>
                            {row.user?.name
                                ? (row.user.name.length > 15
                                    ? `${row.user.name.substring(0, 15)}...`
                                    : row.user.name)
                                : "N/A"}
                        </span>
                    </div>
                </Tooltip>
            ),
        },
        {
            field: "full_name",
            headerName: "Full Name",
            render: (row) => (
                <Tooltip title={row.full_name}>
                    {row.full_name.length > 20 ? `${row.full_name.substring(0, 20)}...` : row.full_name}
                </Tooltip>
            ),
        },
        {
            field: "phone_number",
            headerName: "Phone Number"
        },
        {
            field: "address_type",
            headerName: "Type",
            align: "center",
            render: (row) => (
                <Tooltip title={row.address_type}>
                    {row.address_type === 'home' ? (
                        <HomeTwoToneIcon color="primary" />
                    ) : row.address_type === 'work' ? (
                        <WorkTwoToneIcon color="secondary" />
                    ) : (
                        <Chip label={row.address_type} size="small" />
                    )}
                </Tooltip>
            ),
        },
        {
            field: "full_address",
            headerName: "Full Address",
            render: (row) => (
                <Tooltip title={row.full_address}>
                    {row.full_address.length > 30 ? `${row.full_address.substring(0, 30)}...` : row.full_address}
                </Tooltip>
            ),
        },
        {
            field: "pin_code",
            headerName: "PIN Code",
            align: "center",
        },
        {
            field: "is_default",
            headerName: "Default",
            align: "center",
            render: (row) => (
                row.is_default === 1 ? (
                    <Tooltip title="Default Address">
                        <LocationOnTwoToneIcon color="primary" />
                    </Tooltip>
                ) : (
                    <Tooltip title="Not Default">
                        <LocationOffTwoToneIcon color="disabled" />
                    </Tooltip>
                )
            ),
        },
        {
            field: "status",
            headerName: "Status",
            align: "center",
            render: (row) => (
                row.status === 1 ? (
                    <Tooltip title="Active">
                        <ToggleOnTwoToneIcon color="success" />
                    </Tooltip>
                ) : row.status === 0 ? (
                    <Tooltip title="Inactive">
                        <ToggleOffTwoToneIcon color="error" />
                    </Tooltip>
                ) : (
                    <Tooltip title="Unknown">
                        <ToggleOffTwoToneIcon color="warning" />
                    </Tooltip>
                )
            ),
        },
        {
            field: "updated_at",
            headerName: "Updated At",
            align: "center",
            render: (row) => (
                <>
                    {new Date(row.updated_at).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}{" "}
                    {new Date(row.updated_at).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                    })}
                </>
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            fetchDataUrl="/admin/address/fetch_all"
            addButtonPath="/add-address"
            editButtonPath="/update-address"
            deleteUrl="/admin/address/delete"
            title="Address List"
            enableChangePassword={false}
        />
    );
};

export default AddressPage;
