import { useState, useEffect } from "react";
import { API_URL } from "../constants";

import { Table } from 'antd'

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [postcodes, setPostcodes] = useState([]);


    const getCustomers = async () => {
        try {
            const response = await fetch(API_URL + "api/customers");
            const data = await response.json();
            setCustomers(data.content);
            getPostcodes();
        } catch (error) {
            console.log(error);
        }



    }

    const getPostcodes = () => {
        const arr = []
        customers.map(customer => {
            if (!(arr.includes(customer.postcode)))
                arr.push(customer.postcode)
            return true;
        })
        setPostcodes(arr);

    }

    const columns = [
        {
            title: 'Firstname',
            dataIndex: 'firstname',
            sorter: (a, b) => a.firstname > b.firstname,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: 'Lastname',
            dataIndex: 'lastname',
            sorter: (a, b) => a.lastname > b.lastname,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: 'Find with postcode',
            filters: postcodes.map(postcode => {
                return ({ text: postcode, value: postcode })
            }),
            onFilter: (value, record) => record.postcode.indexOf(value) === 0
        }


    ]



    const expandedColumns = [
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
    ]

    useEffect(() => {
        // eslint-disable-next-line
        getCustomers();



    }, [])



    return (
        <>
            <Table
                sticky={true}
                columns={columns}
                dataSource={customers}
                //rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                rowKey={customer => customer.links[0].href}
                expandable={{
                    defaultExpandedRowKeys: ['0'],
                    expandedRowRender: (customer) => (
                        <Table
                            dataSource={[customer]}
                            //rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                            columns={expandedColumns}
                            pagination={false}
                            rowKey={customer => customer.links[0].href}
                        />
                    )
                }}
            />
        </>
    );
}