import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Avatar, Button, Typography} from "@material-ui/core";
import bird from '../assets/images/avatars/bird.jpg';
import cactus from '../assets/images/avatars/cactus.png';
import panda from '../assets/images/avatars/panda.png';
import penguine from '../assets/images/avatars/penguine.png';
import snowman from '../assets/images/avatars/snowman.png';
import {Link} from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import disclaimer from '../assets/images/carousel/disclaimer.png';
import hamilton from '../assets/images/carousel/hamilton.png';
import rses from '../assets/images/carousel/rses.png';
import ucla from '../assets/images/carousel/ucla.png';
import avatarBackground1 from '../assets/images/avatarBackground1.jpeg';

const useStyles = makeStyles({
    customisedAvatar: {
        height: 115, width: 115,
        marginTop: 80,
    },
    header: {
        height: 60, width: window.innerWidth, position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        zIndex: 10,
        borderBottom: '1px solid rgba(0,0,0,.07)',
        justifyContent: 'space-between',
        top: 0,
    },
    quizContainer: {
        display: 'flex',
        width: window.innerWidth,
        //marginTop: 1000
        height: 580
    },
    leftQuizContainer: {
        width: window.innerWidth * 0.6,
       // height: 500,
        backgroundColor: 'white',
    },
    rightQuizContainer: {
        width: window.innerWidth * 0.4,
        backgroundColor: 'grey',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'center'
    }
});

const avatarSource = [bird, cactus, panda, penguine, snowman];

const HomeScreen = () => {
    const classes = useStyles();
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const CustomisedAvatar = ({avatar}) => {
        return (
            <div style={{cursor: 'pointer'}} onClick={() => setSelectedAvatar(avatar)}>
                <Avatar src={avatar}
                        style={{border: selectedAvatar === avatar ? '2px solid black' : ''}}
                        className={classes.customisedAvatar}/>
            </div>
        )
    }

    const Header = () => {
        return (
            <div className={classes.header}>
                <div style={{marginLeft: 12}}>
                    <Typography style={{fontSize: 24, fontWeight: 600, color: '#3f4652'}}>
                       Behavioural analysis using gamification
                    </Typography>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginRight: 12}}>
                    {/*make navigation of page here */}
                    {/*refer https://stackoverflow.com/questions/43441856/how-to-scroll-to-an-element*/}
                </div>
            </div>
        )
    }
    return (
        <div>
            <Header/>
            <div style={{paddingTop: 200}}>
                <Typography style={{fontSize: 50}} align={"center"}>
                  <h3> Behavioural Analysis</h3>
                </Typography>
                <Typography style={{marginTop: 40, fontSize: 50, fontFace: 'Cantarell'}} align={"center"} >
               <em> "The most important thing is to look ahead. <br/> The past is your anchor."</em>
                </Typography>
            </div>

            <div style={{height: 550, width: 1000, marginTop: 220, marginLeft: 200}}>
                <Carousel autoPlay={true} showThumbs={false} showStatus={false}>
                    <div>
                        <img src={disclaimer}/>
                    </div>
                    <div>
                        <img src={hamilton}/>
                    </div>
                    <div>
                        <img src={rses}/>
                    </div>
                    <div>
                        <img src={ucla}/>
                    </div>
                    
                </Carousel>
            </div>


            <div className={classes.quizContainer} style={{margin:0}}>
                <div className={classes.leftQuizContainer} style={{ backgroundImage: `url(${avatarBackground1})`}}>
                    <Typography align={"center"} style={{fontSize: 50, marginTop: 100, marginBottom: 50}}>
                        Choose Your Avatar
                    </Typography>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: "space-around"
                    }}>
                        {avatarSource.map((avatar) => {
                            return (
                                <CustomisedAvatar avatar={avatar}/>
                            )
                        })}
                    </div>
                </div>


                <div className={classes.rightQuizContainer} style={{backgroundColor: "white" }}>
                    <Button variant="contained" color="primary" style={{height: 60, width: 180}}
                            disabled={!selectedAvatar}>
                        <Link
                            to={{
                                pathname: "/quiz",
                                state: {
                                    quesBankNumber: "1",
                                    avatar: selectedAvatar
                                },
                            }}
                            style={{ 
                                textDecoration: 'none' ,
                                color:"white",
                                fontSize: 22
                            }}>
                            quiz 1

                        </Link>
                    </Button>

                    <Button variant="contained" color="primary" style={{height: 60, width: 180}}
                            disabled={!selectedAvatar}>
                        <Link
                            to={{
                                pathname: "/quiz",
                                state: {
                                    quesBankNumber: "2",
                                    avatar: selectedAvatar
                                },
                            }}
                            style={{ 
                                textDecoration: 'none' ,
                                color:"white",
                                fontSize: 22
                            }}>
                            quiz 2

                        </Link>
                    </Button>

                    <Button variant="contained" color="primary" style={{height: 60, width: 180}}
                            disabled={!selectedAvatar}>
                        <Link
                            to={{
                                pathname: "/quiz",
                                state: {
                                    quesBankNumber: "3",
                                    avatar: selectedAvatar
                                },
                            }}
                            style={{ 
                                textDecoration: 'none' ,
                                color:"white",
                                fontSize: 22
                            }}>
                            quiz 3

                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HomeScreen;