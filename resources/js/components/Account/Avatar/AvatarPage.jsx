import React from "react";
import DataTable from "../../Template/DataTable";
import { format } from "date-fns";
import Tooltip from "@mui/material/Tooltip";
import { Avatar as MuiAvatar } from "@mui/material";
import ImageNotSupportedTwoToneIcon from '@mui/icons-material/ImageNotSupportedTwoTone';

const AvatarPage = () => {
    const columns = [
        {
            field: "path",
            headerName: "Avatar Image",
            render: (row) => (
                <Tooltip title={row.path ? "Avatar Image" : "No Image"}>
                    {row.path ? (
                        <MuiAvatar
                            src={row.path}
                            alt="Avatar"
                            sx={{
                                width: 50,
                                height: 50,
                                borderRadius: '50%'
                            }}
                        />
                    ) : (
                        <ImageNotSupportedTwoToneIcon
                            sx={{
                                fontSize: 40,
                                color: 'text.disabled'
                            }}
                        />
                    )}
                </Tooltip>
            ),
        },
        {
            field: "created_at",
            headerName: "Created At",
            align: "center",
            render: (row) => (
                <>
                    {row.created_at ? format(new Date(row.created_at), "MMM-dd-yyyy hh:mm a") : "-"}
                </>
            ),
        },
        {
            field: "updated_at",
            headerName: "Updated At",
            align: "center",
            render: (row) => (
                <>
                    {row.updated_at ? format(new Date(row.updated_at), "MMM-dd-yyyy hh:mm a") : "-"}
                </>
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            fetchDataUrl="/admin/avatar/fetch_all_avatars"
            addButtonPath="/add-avatar"
            editButtonPath="/update-avatar"
            deleteUrl="/admin/avatar/delete_avatar"
            title="Avatar List"
            enableChangePassword={false}
            hideStatusColumn={true}
        />
    );
};

export default AvatarPage;
