import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { checkToken } from '../actions/auth'



export default function withAuth(ComponentToBeRendered) {
    return class extends Component {
      constructor() {
        super();
        this.state = {
          loading: true,
          redirect: false,
        };
      }
      async componentDidMount() {
        checkToken().then( res => {
          if (res.status === 200) {
            this.setState({ loading: false });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        }).catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
      }
      render() {
        const { loading, redirect } = this.state;
        if (loading) {
          return null;
        }
        if (redirect) {
          return <Redirect to="/" />;
        }
        return <ComponentToBeRendered {...this.props} />;
      }
    }
}