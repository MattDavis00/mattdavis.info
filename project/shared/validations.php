<?php

$validate = new Validation;

class Validation
{

  function Email()
  {

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
    if (strlen($name) > 50)
    {
      $returnData->errorFlag = true;
      $returnData->errorMessage .= "Name exceeds 50 characters. ";
    }

    return $returnData;
  }

  function Password($password, $passwordRepeat)
  {
    // $returnData = new StdClass();
    // $returnData->errorFlag = false;
    // $returnData->errorMessage = "";
    //
    // if ()
    //
    // return $returnData;
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
