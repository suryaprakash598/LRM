function name()
{
    try{
        var recID = nlapiGetRecordID();
    }catch (e)
    {
        log.debug('error',e.toString())
    }
}