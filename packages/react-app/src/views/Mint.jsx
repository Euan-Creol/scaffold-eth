import { utils, Wallet } from "ethers";
import { Button, Divider, Input, Dropdown, Menu, Space, Row, Col } from "antd";
import { DownOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import React, {useEffect, useState} from "react";
import { Address, Balance, Events } from "../components";
import XLSX, {read} from "xlsx";

export default function Mint({
 address,
 userSigner,
 mainnetProvider,
 localProvider,
 yourLocalBalance,
 price,
 tx,
 readContracts,
 writeContracts,
 data
}) {

  const onClick = ({ key }) => {
    setNewAddress(key)
  };

  //TO-DO change to actual wallets
  const verifierWallet = '0x2BaFF0a5838Aa1F03dEFe89a4086362fe31F6675' //Wallet.createRandom()

  //TO-DO change to actual wallets
  const ECSWallet = '0x55C9354F716188d3C937FC3C1569685B740bC8e3' //Wallet.createRandom()
  const ACEWallet = '0xB6FA19268D9bc22d1f92574505a5fac7622252Db' //Wallet.createRandom()

  const onClickMethodology = ({ key }) => {
    setNewMethodology(key)
  };

  const projectDeveloperDropdown = (
    <Menu onClick={onClick}>
      <Menu.Item key={ECSWallet}>
        ECS
      </Menu.Item>
      <Menu.Item key={ACEWallet}>
        ACE
      </Menu.Item>
    </Menu>
  );

  const methodologyDropdown = (
    <Menu onClick={onClickMethodology}>
      <Menu.Item key={"Fuel"}>
        Fuel Data
      </Menu.Item>
      <Menu.Item key={"Stove"}>
        Stove Data
      </Menu.Item>
    </Menu>
  );



  function displayIcon(parameterInput) {
    if(parameterInput === null) {
      return <CloseCircleOutlined type="message" style={{ fontSize: '24px', color: '#08c' }} theme="outlined" />
    } else {
      return <CheckCircleOutlined type="message" style={{ fontSize: '24px', color: '#22CF21' }} theme="outlined"/>
    }
  }

  function enableDataSubmit() {
    if (newAddress !== null
      && newAmount !== null
      && newFile !== null
      && newMethodology !== null
      && newStoveID !== null
      && newStoveGroupID !== null
      && newBurnTime !== null
      && newEmissionFactor !== null
      && newArweaveLink !== null
      && newFullSignature) {
      return false
    } else {
      return true
    }
  }

  const handleFile = (e) => {
    const content = e.target.result;
    //console.log('file content',  content)
    let workbook = XLSX.read(content, {
      type: 'binary'
    });
    workbook.SheetNames.forEach(function(sheetName) {
      // Here is your object
      let XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
      let json_object = JSON.stringify(XL_row_object);
      setNewFile(json_object)
    })
    // You can set content in state and show it in render.
  }

  const handleChangeFile = (file) => {
    let fileData = new FileReader();
    fileData.onloadend = handleFile;
    //fileData.readAsText(file);
    fileData.readAsBinaryString(file)
  }

  const [newAddress, setNewAddress] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [newAmount, setNewAmount] = useState(null);
  const [newNonce, setNewNonce] = useState(null);
  const [newSignature, setNewSignature] = useState(null);
  const [newFullSignature, setNewFullSignature] = useState(null);
  const [newVerifyResult, setNewVerifyResult] = useState('...');
  const [newMethodology, setNewMethodology] = useState(null);
  const [newMessageHash, setNewMessageHash] = useState(null);
  const [newStoveID, setNewStoveID] = useState(null);
  const [newStoveGroupID, setNewStoveGroupID] = useState(null);
  const [newBurnTime, setNewBurnTime] = useState(null);
  const [newEmissionFactor, setNewEmissionFactor] = useState(null);
  const [newArweaveLink, setNewArweaveLink] = useState(null);
  const [newApproveMint, setNewApproveMint] = useState(true);

  return (
    <div>
      <h1>Mint</h1>
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 550, margin: "auto", marginTop: 32 }}>
        <div>
          Your Address:
          <Address address={address} ensProvider={mainnetProvider} fontSize={16} />
        </div>
        <div>
          Contract Address:
          <Address
            address={readContracts && readContracts.TonMinter ? readContracts.TonMinter.address : null}
            ensProvider={mainnetProvider}
            fontSize={16}
          />
        </div>
      </div>
      <div style={{ border: "1px solid #2faf49", padding: 16, width: 550, margin: "auto", marginTop: 32, textAlign: "left" }}>
        <div style={{ margin: 8 }}>
          <Row>
            <Col span={22}>
              <Space direction="vertical">
                <Space wrap>
                  <Dropdown overlay={projectDeveloperDropdown} click placement="bottomCenter" >
                    <h2>
                      <a className="ant-dropdown-link" style={{ color: '#cccccc' }} onClick={e => e.preventDefault()}>
                        Project Developer <DownOutlined />
                      </a>
                    </h2>
                  </Dropdown>
                </Space>
              </Space>
              <h4>{newAddress}</h4>
            </Col>
            <Col span={2}>
              {displayIcon(newAddress)}
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={22}>
              <Space direction="vertical">
                <Space wrap>
                  <Dropdown overlay={methodologyDropdown} click placement="bottomCenter" >
                    <h2>
                      <a className="ant-dropdown-link" style={{ color: '#cccccc' }} onClick={e => e.preventDefault()}>
                        Methodology <DownOutlined />
                      </a>
                    </h2>
                  </Dropdown>
                </Space>
              </Space>
              <h4>{newMethodology}</h4>
            </Col>
            <Col span={2}>
              {displayIcon(newMethodology)}
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={10}>
              <h2>Stove Group ID</h2>
              <Input
                style={{marginRight:10}}
                onChange={e => {
                  setNewStoveGroupID(e.target.value);
                }}
              />
            </Col>
            <Col span={1}/>
            <Col span={10}>
              <h2>Stove ID</h2>
              <Input
                onChange={e => {
                  setNewStoveID(e.target.value);
                }}
              />
            </Col>
            <Col span={1}/>
            <Col span={2}>
              {displayIcon(newStoveGroupID && newStoveID)}
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={22}>
              <h2>Amount of Carbon (grams CO2e)</h2>
              <Input
                onChange={e => {
                  setNewAmount(e.target.value);
                }}
              />
            </Col>
            <Col span={2}>
              {displayIcon(newAmount)}
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={22}>
              <h2>Batch Data</h2>
              <input type="file" accept=".xlsx" onChange={e =>
                handleChangeFile(e.target.files[0])} />
              <Input
                onChange={e => {
                  setNewFile(e.target.value);
                }}
              />
            </Col>
            <Col span={2}>
              {displayIcon(newFile)}
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={22}>
              <h2>Emission factor</h2>
              <Input
                onChange={e => {
                  setNewEmissionFactor(e.target.value);
                }}
              />
            </Col>
            <Col span={2}>
              {displayIcon(newEmissionFactor)}
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={22}>
              <h2>Burn Time</h2>
              <Input
                onChange={e => {
                  setNewBurnTime(e.target.value);
                }}
              />
            </Col>
            <Col span={2}>
              {displayIcon(newBurnTime)}
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={22}>
              <h2>Verifier's Signature</h2>
              <Input
                onChange={e => {
                  setNewFullSignature(e.target.value);
                }}
              />
            </Col>
            <Col span={2}>
              {displayIcon(newFullSignature)}
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={22}>
              <h2>Arweave Link</h2>
              <Input
                onChange={e => {
                  setNewArweaveLink(e.target.value);
                }}
              />
            </Col>
            <Col span={2}>
              {displayIcon(newArweaveLink)}
            </Col>
          </Row>
          <Divider />
        </div>
        <div style={{textAlign: "center"}}>
          <Button
            style={{ marginTop: 8 }}
            disabled={enableDataSubmit()}
            onClick={async () => {
              const newMessage = newMethodology + newStoveGroupID + newStoveID + newBurnTime + newEmissionFactor + newFile;
              const newNonce = 1;
              setNewMessage(newMessage)
              setNewNonce(newNonce)
              console.log(newStoveID, newBurnTime, newEmissionFactor, newStoveGroupID, address, newAddress, newAmount, newMessage, newNonce, newFullSignature)
              const result = tx(writeContracts.TonMinter.submitCarbonProof(newStoveID, newBurnTime, newEmissionFactor, newStoveGroupID, address, newAddress, newAmount, newMessage, newNonce, newFullSignature));
              //const result = tx(writeContracts.Verifier.verify(address, newAddress, newAmount, newMessage, newNonce, newFullSignature));
              //setNewVerifyResult(await result)
              //setNewApproveMint(!result)
            }}
          >
            Submit Proof
          </Button>
          <h4>Verify result: {newVerifyResult.toString()}</h4>
        </div>
      </div>
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 550, margin: "auto", marginTop: 32 }}>
        <h2>
          Mint Tonnage
        </h2>
        <div>
          Pending CO2e grams: {}
        </div>
        <Button
          //disabled={newApproveMint}
          onClick={async () => {
            console.log("Mint")
            console.log(readContracts.TonMinter)
            console.log(readContracts.TonMinter.pendingCO2eGrams)

          }}
        >
          Mint
        </Button>
      </div>
    </div>
  )
}