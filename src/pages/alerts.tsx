/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BucketAbi from "../contracts/BucketAbi.json";
import axios from 'axios';

const contractId = "0.0.5136500";
const topicId = "0.0.4887959";

const MIRROR_NODE_API = "https://testnet.mirrornode.hedera.com";

//@ts-ignore
const decodeBase64 = (data) => Buffer.from(data, 'base64').toString('utf8');

const extractAccountId = input => (input.match(/0\.0\.\d+/) || [null])[0];

export const Alerts = () => {
    const [notifs, setNotifs] = useState([])
    const navigate = useNavigate();

    const handleClick = (item) => {
        console.log(extractAccountId(decodeBase64(item?.message)), item)
        if(extractAccountId(decodeBase64(item?.message))) {
            navigate("/" + extractAccountId(decodeBase64(item?.message)))
        }
    }


    async function getNotifs() {
        const response = await axios.get(`${MIRROR_NODE_API}/api/v1/topics/${topicId}/messages?order=desc`);
        setNotifs(response?.data?.messages)
    }

    useEffect(() => {
        getNotifs()
    }, [])

    return <div className='flex flex-col'>
        <div>Notifications</div>
        <div className='flex flex-col w-full'>
            {notifs?.map(item => {
                return <div className='p-4 text-left'>
                    <div className='font-bold'>{item?.payer_account_id}</div>
                    {/* <div>{item?.consensus_timestamp}</div> */}
                    <div onClick={() => handleClick(item)}>{decodeBase64(item?.message)}</div>
                </div>
            })}
        </div>
    </div>
}