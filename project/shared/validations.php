<?php

$validate = new Validation;

class Validation
{

  function Email($email)
  {
    $returnData = new StdClass();
    $returnData->errorFlag = false;
    $returnData->errorMessage = "";

    if ($this->Empty($email)->errorFlag)
    {
      $returnData->errorFlag = true;
      $returnData->errorMessage .= "Please enter your email. ";
    }
    else {
      if (strlen($email) > 100)
      {
        $returnData->errorFlag = true;
        $returnData->errorMessage .= "Email exceeds 100 characters. ";
      }
      if (!preg_match('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/', $email))
      {
        $returnData->errorFlag = true;
        $returnData->errorMessage .= "Email is not valid. ";
      }
    }

    return $returnData;
  }

  function Name($name)
  {
    $returnData = new StdClass();
    $returnData->errorFlag = false;
    $returnData->errorMessage = "";

    if ($this->Empty($name)->errorFlag)
    {
      $returnData->errorFlag = true;
      $returnData->errorMessage .= "Please enter your name. ";
    }
    else
    {
      if (strlen($name) > 50)
      {
        $returnData->errorFlag = true;
        $returnData->errorMessage .= "Name exceeds 50 characters. ";
      }
    }

    return $returnData;
  }

  function Password($password, $passwordRepeat)
  {
    $returnData = new StdClass();
    $returnData->errorFlag = false;
    $returnData->errorMessage = "";

    if ($this->Empty($password)->errorFlag)
    {
      $returnData->errorFlag = true;
      $returnData->errorMessage .= "Please enter a password. ";
    }
    else
    {
      if (strlen($password) > 50)
      {
        $returnData->errorFlag = true;
        $returnData->errorMessage .= "Name exceeds 50 characters. ";
      }
      if ($password !== $passwordRepeat)
      {
        $returnData->errorFlag = true;
        $returnData->errorMessage .= "Passwords do not match. ";
      }
    }

    return $returnData;
  }

  function Empty($value)
  {
    $returnData = new StdClass();
    $returnData->errorFlag = false;
    $returnData->errorMessage = "";

    if (empty($value))
    {
      $returnData->errorFlag = true;
      $returnData->errorMessage .= "Please fill in this field. ";
    }

    return $returnData;
  }

}
