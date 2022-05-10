
import React, { useEffect, useState } from 'react';
import Block from './images/intro.gif';
import { FiGithub } from "react-icons/fi";
import { ImLinkedin2 } from "react-icons/im";
import { GoLinkExternal } from "react-icons/go";




function LandingPage () {
    return (
<div className='intro'>
	<div>
	<img src={Block} alt="intro" style={{ maxWidth: 20 + "rem" }}/>
	</div>
	<div>
		<h2>Blockchain ethereum project</h2>
		<p>By Valkiria Salerno</p>
        <div>
            <a href="github.com/valkiriaspell"><FiGithub style={{ fontSize: 1.2 + "rem", margin: 0.8 + "rem" }}/></a>
        <a href="https://www.linkedin.com/in/valkiria-salerno-9860a6164/"> <ImLinkedin2 style={{ fontSize: 1.2 + "rem", margin: 0.8 + "rem" }} /></a>
        <a href="http://salmawebservices.com/"><GoLinkExternal style={{ fontSize: 1.2 + "rem", margin: 0.8 + "rem" }}/></a>
            </div>
        <a href='/login' ><button className='btn btn-primary'>Go in</button></a>
	</div>
</div>

    )
}

export default LandingPage;