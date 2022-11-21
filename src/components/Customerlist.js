import { useState, useEffect } from "react";
import { API_URL } from "../constants";
import { CSVLink, CSVDownload } from "react-csv";

import { Table, message, Button, Popconfirm, Space } from 'antd';
import { DeleteTwoTone, DownloadOutlined } from '@ant-design/icons';
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTrainingToCustomer from "./AddTrainingToCustomer";

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [postcodes, setPostcodes] = useState([]);
    const [firstnames, setFirstnames] = useState([]);
    const [lastnames, setLastnames] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    const getCustomers = async () => {
        try {
            const response = await fetch(API_URL + "api/customers");
            const data = await response.json();
            setCustomers(data.content);
        } catch (error) {
            console.log(error);
        }
    }


    //Columns for table
    const columnsDefs = [
        {
            title: 'Firstname',
            dataIndex: 'firstname',
            sorter: (a, b) => a.firstname.localeCompare(b.firstname),
            sortDirections: ["descend", "ascend"],
            filters: firstnames.map(firstname => {
                return ({ text: firstname, value: firstname })
            }),
            onFilter: (value, record) => record.firstname.indexOf(value) === 0,
            filterSearch: true
        },
        {
            title: 'Lastname',
            dataIndex: 'lastname',
            sorter: (a, b) => a.lastname.localeCompare(b.lastname),
            sortDirections: ["descend", "ascend"],
            filters: lastnames.map(lastname => {
                return ({ text: lastname, value: lastname })
            }),
            onFilter: (value, record) => record.lastname.indexOf(value) === 0,
            filterSearch: true
        },
        {
            title: 'Find with postcode',
            filters: postcodes.map(postcode => {
                return ({ text: postcode, value: postcode })
            }),
            onFilter: (value, record) => record.postcode.indexOf(value) === 0,
            width: 120
        },
        {
            title: 'Add training',
            render: params => <AddTrainingToCustomer data={params} addTrainingToCustomer={addTrainingToCustomer} />,
            width: 85
        },
        {
            render: params => <EditCustomer data={params} updateCustomer={updateCustomer} />,
            width: 120

        },
        {
            render: params =>
                <Popconfirm
                    title={`Are you sure to delete customer: ${params.firstname} ${params.lastname}?`}
                    onConfirm={() => deleteCustomer(params)}
                >
                    <Button
                        danger
                        type="primary"
                    >Delete<DeleteTwoTone /></Button>
                </Popconfirm>,
            width: 120
        }
    ];


    // Expanded columns for table
    const expandedColumnsDefs = [
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Phone',
            dataIndex: 'phone'
        },
        {
            title: 'Streetaddress',
            dataIndex: 'streetaddress'
        },
        {
            title: 'Postcode',
            dataIndex: 'postcode'
        },
        {
            title: 'City',
            dataIndex: 'city'
        }
    ];

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

    useEffect(() => {
        // eslint-disable-next-line
        getCustomers();
    }, [])

    useEffect(() => {
        const postcodesArr = [];
        const firstnamesArr = [];
        const lastnamesArr = [];
        customers.map(customer => {
            // If a postocde is not in an arr, push it to arr.
            if (!(postcodesArr.includes(customer.postcode)))
                postcodesArr.push(customer.postcode)
            // If a first name is not in an arr, push it to arr.
            if (!(firstnamesArr.includes(customer.firstname)))
                firstnamesArr.push(customer.firstname);
            // If a last name is not in an arr, push it to arr.
            if (!(lastnamesArr.includes(customer.lastname)))
                lastnamesArr.push(customer.lastname);
            return true;
        })
        setPostcodes(postcodesArr);
        setFirstnames(firstnamesArr);
        setLastnames(lastnamesArr);
    }, [customers]);

    const addCustomer = async (customer) => {
        const config = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        };
        try {
            const response = await fetch(API_URL + 'api/customers', config);
            if (response.ok) {
                getCustomers();
                success();
            }
            else error();
        } catch (error) {

        }
    }

    const updateCustomer = async (customer, url) => {
        const config = {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        };
        try {
            const response = await fetch(url, config);
            if (response.ok) {
                getCustomers();
                success();
            }
            else error();
        } catch (error) {

        }
    }

    const deleteCustomer = async (data) => {
        const config = {
            method: 'DELETE'
        };
        try {
            const response = await fetch(data.links[1].href, config);
            if (response.ok) {
                getCustomers();
                success();
            }
            else error();
        } catch (error) {

        }

    }

    const addTrainingToCustomer = async (training) => {
        const config = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(training)
        };
        try {
            const response = await fetch(API_URL + 'api/trainings', config);
            console.log(response)
            if (response.ok) {
                success();
            }
            else error();
        } catch (error) {

        }

    }



    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Success',
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Something went wrong',
        });
    };



    return (
        <>
            {contextHolder}
            <Space>
                <AddCustomer addCustomer={addCustomer} />
                <CSVLink
                    data={customers}
                    headers={headers}
                    enclosingCharacter={``}
                    filename={"customers.csv"}
                    target="_blank"
                ><Button type="primary">
                        Download to .CSV <DownloadOutlined />

                    </Button>
                </CSVLink>
            </Space>
            <Table
                bordered
                sticky={true}
                columns={columnsDefs}
                dataSource={customers}
                rowKey={customer => customer.links[0].href}
                expandable={{
                    defaultExpandedRowKeys: ['0'],
                    expandedRowRender: (customer) => (
                        <Table
                            bordered
                            dataSource={[customer]}
                            columns={expandedColumnsDefs}
                            pagination={false}
                            rowKey={customer => customer.links[0].href}
                        />
                    )
                }}
            />
        </>
    );
}