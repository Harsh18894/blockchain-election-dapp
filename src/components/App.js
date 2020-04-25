import React, { Component } from 'react'
import Web3 from 'web3'
import Election from '../abis/Election.json'
import './App.css'
import Navbar from './Navbar'

class App extends Component {

  async componentWillMount() {
    const metamaskInstalled = typeof window.web3 !== 'undefined'
    this.setState({ metamaskInstalled })
    if (metamaskInstalled) {
      await this.loadWeb3()
      await this.loadBlockchainData()
    }
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      // Do nothing
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = Election.networks[networkId]
    if (networkData) {
      const election = web3.eth.Contract(Election.abi, networkData.address)
      this.setState({ election })
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      election: null,
      metamaskInstalled: false
    }
  }


  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
