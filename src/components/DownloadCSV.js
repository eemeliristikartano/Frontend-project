import { CSVLink } from "react-csv";
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from "antd";

export default function DownloadCSV(props) {
    //Headers for .CSV file.
    const headers = [
        {
            label: 'firstname',
            key: 'firstname'
        },
        {
            label: 'lastname',
            key: 'lastname'
        },
        {
            label: 'email',
            key: 'email'
        },
        {
            label: 'phone',
            key: 'phone'
        },
        {
            label: 'streetaddress',
            key: 'streetaddress'
        },
        {
            label: 'postcode',
            key: 'postcode'
        },
        {
            label: 'city',
            key: 'city'
        }
    ]
    return (
        <>
            <CSVLink
                data={props.customers}
                headers={headers}
                enclosingCharacter={``}
                filename={"customers.csv"}
                target="_blank"
            ><Button type="primary">
                    Download to .CSV <DownloadOutlined />
                </Button>
            </CSVLink>
        </>)
}