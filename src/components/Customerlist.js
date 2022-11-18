import { useState, useEffect } from "react";
import { API_URL } from "../constants";

import { Table, Button } from 'antd'

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [postcodes, setPostcodes] = useState([]);
    const [firstnames, setFirstnames] = useState([]);
    const [lastnames, setLastnames] = useState([]);


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
    const columns = [
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
            width: '10%'
        }
    ];


    // Expanded columns for table
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
    ];

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
            return
        })
        setPostcodes(postcodesArr);
        setFirstnames(firstnamesArr);
        setLastnames(lastnamesArr);
    }, [customers])



    return (
        <>
            <Table
                bordered
                sticky={true}
                columns={columns}
                dataSource={customers}
                rowKey={customer => customer.links[0].href}
                expandable={{
                    defaultExpandedRowKeys: ['0'],
                    expandedRowRender: (customer) => (
                        <Table
                            bordered
                            dataSource={[customer]}
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